import dns from 'node:dns/promises';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// A DNS lookup for a mongodb+srv:// URI can outlive the driver's own timeout.
// Bound the whole attempt so the API can still start (without database-backed
// features) instead of hanging indefinitely during development.
const DEFAULT_CONNECT_TIMEOUT_MS = 12000;
const DNS_TIMEOUT_MS = 4000;
const DOH_TIMEOUT_MS = 3000;
const DOH_ATTEMPTS = 2;
const DOH_RETRY_DELAY_MS = 250;
const SRV_PREFIX = 'mongodb+srv://';
const DNS_TYPE_CODES = { SRV: 33, TXT: 16 };
const DOH_PROVIDERS = [
  'https://cloudflare-dns.com/dns-query',
  'https://dns.google/resolve',
];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function withTimeout(promise, timeoutMs, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

function isSrvUri(uri) {
  return String(uri).toLowerCase().startsWith(SRV_PREFIX);
}

function uriIncludesDbName(uri) {
  const withoutScheme = String(uri).replace(/^mongodb(?:\+srv)?:\/\//i, '');
  const authorityEnd = withoutScheme.search(/[/?]/);

  if (authorityEnd === -1) {
    return false;
  }

  const pathPart = withoutScheme.slice(authorityEnd).split('?')[0];
  return pathPart.length > 1;
}

/**
 * Split a mongodb+srv:// URI without decoding the credentials. The userinfo
 * part is reused verbatim so percent-encoded passwords keep working.
 */
function splitSrvUri(uri) {
  const rest = String(uri).slice(SRV_PREFIX.length);
  const authorityEnd = rest.search(/[/?]/);
  const authority = authorityEnd === -1 ? rest : rest.slice(0, authorityEnd);
  const tail = authorityEnd === -1 ? '' : rest.slice(authorityEnd);
  const atIndex = authority.lastIndexOf('@');
  const userinfo = atIndex === -1 ? '' : authority.slice(0, atIndex + 1);
  const host = (atIndex === -1 ? authority : authority.slice(atIndex + 1))
    .split(':')[0]
    .trim()
    .toLowerCase();

  if (!host) {
    return null;
  }

  const queryIndex = tail.indexOf('?');
  const pathPart = queryIndex === -1 ? tail : tail.slice(0, queryIndex);
  const queryPart = queryIndex === -1 ? '' : tail.slice(queryIndex + 1);

  return {
    userinfo,
    host,
    dbPath: pathPart && pathPart !== '/' ? pathPart : '',
    query: new URLSearchParams(queryPart),
  };
}

async function queryDohOnce(name, type) {
  const attempts = DOH_PROVIDERS.map(async (provider) => {
    const url = `${provider}?name=${encodeURIComponent(name)}&type=${type}`;
    const response = await fetch(url, {
      headers: { accept: 'application/dns-json' },
      signal: AbortSignal.timeout(DOH_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(
        `DNS-over-HTTPS request failed with HTTP ${response.status}.`,
      );
    }

    const body = await response.json();
    const answers = Array.isArray(body.Answer) ? body.Answer : [];
    const expectedType = DNS_TYPE_CODES[type];
    const relevant = answers.filter(
      (answer) =>
        answer?.type === undefined || Number(answer.type) === expectedType,
    );

    if (relevant.length === 0) {
      throw new Error(`No ${type} answers returned.`);
    }

    return relevant;
  });

  try {
    return await Promise.any(attempts);
  } catch (error) {
    throw error?.errors?.[0] || error;
  }
}

async function queryDoh(name, type) {
  let lastError;

  for (let attempt = 0; attempt < DOH_ATTEMPTS; attempt += 1) {
    try {
      return await queryDohOnce(name, type);
    } catch (error) {
      lastError = error;

      if (attempt < DOH_ATTEMPTS - 1) {
        await delay(DOH_RETRY_DELAY_MS);
      }
    }
  }

  throw lastError || new Error(`DNS ${type} lookup failed.`);
}

async function querySystemDns(name, type) {
  if (type === 'SRV') {
    const records = await withTimeout(
      dns.resolveSrv(name),
      DNS_TIMEOUT_MS,
      'System SRV lookup timed out.',
    );

    return records.map((record) => ({
      host: record.name,
      port: record.port,
    }));
  }

  const records = await withTimeout(
    dns.resolveTxt(name),
    DNS_TIMEOUT_MS,
    'System TXT lookup timed out.',
  );

  return records.map((chunks) => chunks.join(''));
}

function parseSrvAnswers(answers) {
  return answers
    .map((answer) => {
      const parts = String(answer?.data ?? '')
        .trim()
        .split(/\s+/);

      if (parts.length < 4) {
        return null;
      }

      const port = Number.parseInt(parts[2], 10);
      const host = parts[3].replace(/\.$/, '');

      if (!Number.isInteger(port) || port <= 0 || !host) {
        return null;
      }

      return { host, port };
    })
    .filter(Boolean);
}

function parseTxtAnswers(answers) {
  for (const answer of answers) {
    const data = String(answer?.data ?? '');
    const quoted = [...data.matchAll(/"([^"]*)"/g)].map((match) => match[1]);
    const text = quoted.length > 0 ? quoted.join('') : data;

    if (text.includes('=')) {
      return new URLSearchParams(text);
    }
  }

  return null;
}

/**
 * Build a standard mongodb:// URI from the cluster's SRV and TXT records. This
 * bypasses local resolvers that time out on Atlas TXT queries while keeping the
 * original MONGODB_URI untouched. Returns null when resolution fails.
 */
async function resolveDirectUri(uri, { log = logger } = {}) {
  const parsed = splitSrvUri(uri);

  if (!parsed) {
    return null;
  }

  const srvName = `_mongodb._tcp.${parsed.host}`;
  let srvRecords = [];
  let txtParams = null;

  const [srvDoh, txtDoh] = await Promise.allSettled([
    queryDoh(srvName, 'SRV'),
    queryDoh(parsed.host, 'TXT'),
  ]);

  if (srvDoh.status === 'fulfilled') {
    srvRecords = parseSrvAnswers(srvDoh.value);
  }

  if (txtDoh.status === 'fulfilled') {
    txtParams = parseTxtAnswers(txtDoh.value);
  }

  if (srvRecords.length === 0) {
    const dohError = srvDoh.status === 'rejected' ? srvDoh.reason : null;

    if (dohError) {
      log.warn(
        'DNS-over-HTTPS lookup failed for the MongoDB SRV record; trying the system resolver.',
        { reason: dohError?.message || 'Unknown DNS error' },
      );
    }

    const [srvSystem, txtSystem] = await Promise.allSettled([
      querySystemDns(srvName, 'SRV'),
      querySystemDns(parsed.host, 'TXT'),
    ]);

    if (srvSystem.status === 'fulfilled') {
      srvRecords = srvSystem.value;
    }

    if (
      txtSystem.status === 'fulfilled' &&
      txtSystem.value.length > 0 &&
      !txtParams
    ) {
      txtParams = new URLSearchParams(txtSystem.value[0]);
    }

    if (srvRecords.length === 0) {
      const systemError =
        srvSystem.status === 'rejected' ? srvSystem.reason : null;

      log.warn('System DNS lookup failed for the MongoDB SRV record.', {
        reason: systemError?.message || 'No SRV records were returned.',
      });
    }
  }

  if (srvRecords.length === 0) {
    return null;
  }

  const params = new URLSearchParams(parsed.query);

  if (txtParams) {
    for (const [key, value] of txtParams) {
      if (!params.has(key)) {
        params.set(key, value);
      }
    }
  }

  if (!params.has('authSource')) {
    params.set('authSource', 'admin');
  }

  if (!params.has('tls') && !params.has('ssl')) {
    params.set('tls', 'true');
  }

  if (!params.has('retryWrites')) {
    params.set('retryWrites', 'true');
  }

  const hosts = srvRecords
    .map((record) => `${record.host}:${record.port}`)
    .join(',');
  const query = params.toString();

  return `mongodb://${parsed.userinfo}${hosts}${parsed.dbPath}${query ? `?${query}` : ''}`;
}

async function connectWithTimeout(uri, options, timeoutMs) {
  return withTimeout(
    mongoose.connect(uri, options),
    timeoutMs,
    `MongoDB connection attempt timed out after ${timeoutMs}ms.`,
  );
}

/**
 * Connect to MongoDB once at startup. The connection string is never logged
 * because it can contain credentials.
 */
export async function connectToDatabase(
  uri,
  { log = logger, timeoutMs = DEFAULT_CONNECT_TIMEOUT_MS, dbName = '' } = {},
) {
  if (!uri) {
    log.error(
      'MONGODB_URI is not set. Service requests cannot be saved and the admin panel will be unavailable.',
    );
    return null;
  }

  mongoose.set('strictQuery', true);

  // MONGODB_DB_NAME only fills in a missing database name; a name that is
  // already present in MONGODB_URI always wins.
  const effectiveDbName = dbName && !uriIncludesDbName(uri) ? dbName : '';
  let targetUri = uri;

  if (isSrvUri(uri)) {
    const directUri = await resolveDirectUri(uri, { log });

    if (directUri) {
      targetUri = directUri;
      log.info(
        'MongoDB SRV record resolved directly; connecting to the cluster hosts.',
      );
    } else {
      log.warn(
        'MongoDB SRV record could not be resolved directly; using the original connection string.',
      );
    }
  }

  try {
    const client = await connectWithTimeout(
      targetUri,
      {
        ...(effectiveDbName ? { dbName: effectiveDbName } : {}),
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
      },
      timeoutMs,
    );

    log.info(
      `Connected to MongoDB database "${client.connection.name}" (${client.connection.host}).`,
    );

    return client.connection;
  } catch (error) {
    log.error('MongoDB connection failed. Database-backed features are unavailable.', {
      reason: error?.message || 'Unknown MongoDB error',
    });

    // Stop a pending connection attempt so it does not linger after startup
    // has already moved on. This is best effort and must not block startup.
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect().catch(() => {});
    }

    return null;
  }
}

export async function disconnectFromDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
