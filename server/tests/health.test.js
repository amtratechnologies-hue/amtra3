import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp({ enableRateLimit: false });

test('GET /api/v1/health returns a healthy response', async () => {
  const response = await request(app).get('/api/v1/health').expect(200);

  assert.equal(response.body.success, true);
  assert.equal(response.body.message, 'API is healthy.');
  assert.equal(response.body.data.status, 'ok');
  assert.equal(typeof response.body.data.uptimeSeconds, 'number');
  assert.match(response.body.data.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(typeof response.body.data.environment, 'string');
});

test('API responses include security headers and hide Express', async () => {
  const response = await request(app).get('/api/v1/health').expect(200);

  assert.equal(response.headers['x-content-type-options'], 'nosniff');
  assert.equal(response.headers['x-powered-by'], undefined);
});

test('CORS allows configured frontend origins', async () => {
  const response = await request(app)
    .get('/api/v1/health')
    .set('Origin', 'http://localhost:5173')
    .expect(200);

  assert.equal(
    response.headers['access-control-allow-origin'],
    'http://localhost:5173',
  );
});

test('CORS rejects unknown origins', async () => {
  const response = await request(app)
    .get('/api/v1/health')
    .set('Origin', 'https://untrusted.example')
    .expect(403);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /origin is not allowed/i);
});

test('unknown API routes return a consistent JSON 404', async () => {
  const response = await request(app)
    .get('/api/v1/does-not-exist')
    .expect(404);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /was not found/i);
});
