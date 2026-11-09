import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

// Allow a local client/.env to provide VITE_SITE_URL for manual builds.
// Real process environment variables always take precedence.
function loadLocalEnv() {
  const envPath = resolve(currentDir, '../.env');

  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '').trim();
  }
}

loadLocalEnv();

const outputDir = resolve(
  currentDir,
  '..',
  process.argv[2] || 'public',
);

const rawSiteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || '').trim();
const siteUrl = rawSiteUrl.replace(/\/+$/, '');

const serviceIds = [
  'web-development',
  'mobile-development',
  'desktop-development',
  'custom-software-development',
  'payment-application-development',
  'ai-solutions',
  'cybersecurity',
  'database-solutions',
  'cloud-devops',
  'networking-it-infrastructure',
  'it-consulting',
  'website-maintenance-support',
  'digital-marketing',
];

const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  ...serviceIds.map((id) => ({
    path: `/services/${id}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
  { path: '/process', changefreq: 'monthly', priority: '0.7' },
  { path: '/remote-working', changefreq: 'monthly', priority: '0.7' },
  { path: '/founder', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.8' },
];

const robotsPath = resolve(outputDir, 'robots.txt');
const sitemapPath = resolve(outputDir, 'sitemap.xml');

mkdirSync(outputDir, { recursive: true });

if (!/^https?:\/\/[^/\s]+/i.test(siteUrl)) {
  writeFileSync(robotsPath, 'User-agent: *\nAllow: /\nDisallow: /admin\n', 'utf8');
  rmSync(sitemapPath, { force: true });

  console.warn(
    '[sitemap] VITE_SITE_URL is not configured. Skipping sitemap.xml generation.',
  );
} else {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  writeFileSync(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
    'utf8',
  );

  writeFileSync(
    robotsPath,
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    'utf8',
  );

  console.log(`[sitemap] Generated sitemap.xml and robots.txt for ${siteUrl}.`);
}
