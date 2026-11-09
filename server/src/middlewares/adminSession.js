import crypto from 'node:crypto';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';

let cachedMiddleware;

function buildMongoStore(config) {
  // The Node test runner uses an in-memory store so tests never depend on a
  // live MongoDB instance or a developer's local .env.
  if (!env.mongoUri || process.env.NODE_TEST_CONTEXT) {
    return null;
  }

  // Reuse the connection that the API already opened instead of creating a
  // second MongoDB client (and a second SRV lookup) just for sessions.
  if (mongoose.connection.readyState !== 1) {
    return null;
  }

  const dbName =
    mongoose.connection.db?.databaseName || mongoose.connection.name || '';

  return MongoStore.create({
    client: mongoose.connection.getClient(),
    ...(dbName ? { dbName } : {}),
    collectionName: 'adminSessions',
    ttl: Math.ceil(config.sessionTtlMs / 1000),
    autoRemove: 'native',
  });
}

export function createAdminSessionMiddleware({
  config = env.admin,
  log = logger,
  store,
} = {}) {
  let secret = config.sessionSecret;

  if (!secret) {
    if (env.isProduction) {
      throw new Error(
        'SESSION_SECRET must be set to a long random value in production.',
      );
    }

    secret = crypto.randomBytes(32).toString('hex');
    log.warn(
      'SESSION_SECRET is not set. Using a temporary development secret; admin sessions will not survive a restart.',
    );
  }

  if (env.isProduction && secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters in production.');
  }

  const resolvedStore = store === undefined ? buildMongoStore(config) : store;

  if (!resolvedStore && env.isProduction) {
    log.warn(
      'MongoDB is not connected. Admin sessions will use the in-memory store and will not be shared between instances.',
    );
  }

  return session({
    name: config.cookieName,
    secret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: resolvedStore || undefined,
    cookie: {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: config.cookieSameSite,
      path: config.cookiePath,
      maxAge: config.sessionTtlMs,
    },
  });
}

export function getAdminSessionMiddleware() {
  if (!cachedMiddleware) {
    cachedMiddleware = createAdminSessionMiddleware();
  }

  return cachedMiddleware;
}
