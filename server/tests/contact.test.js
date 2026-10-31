import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';

const validPayload = {
  name: '  Ada Lovelace  ',
  email: '  Ada@Example.com ',
  subject: '  New web platform  ',
  message:
    '  We would like to discuss a new web application for our operations team.  ',
};

function buildService(submit) {
  return { submit };
}

test('POST /api/v1/contact stores a valid message and returns 201', async () => {
  let receivedPayload;

  const contactService = buildService(async (payload) => {
    receivedPayload = payload;
    return {
      id: '507f1f77bcf86cd799439011',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send(validPayload)
    .expect(201);

  assert.equal(response.body.success, true);
  assert.equal(response.body.data.id, '507f1f77bcf86cd799439011');
  assert.equal(response.body.data.receivedAt, '2026-01-01T00:00:00.000Z');

  assert.deepEqual(receivedPayload, {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'New web platform',
    message:
      'We would like to discuss a new web application for our operations team.',
  });
});

test('POST /api/v1/contact returns 422 with field errors for invalid input', async () => {
  let serviceCalled = false;

  const contactService = buildService(async () => {
    serviceCalled = true;
    return { id: 'unused', createdAt: new Date().toISOString() };
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({
      name: 'A',
      email: 'not-an-email',
      subject: '',
      message: 'too short',
    })
    .expect(422);

  assert.equal(serviceCalled, false);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Please correct the highlighted fields.');

  const fields = response.body.errors.map((error) => error.field);
  assert.deepEqual(new Set(fields), new Set(['name', 'email', 'subject', 'message']));

  for (const error of response.body.errors) {
    assert.equal(typeof error.message, 'string');
    assert.ok(error.message.length > 0);
  }

  assert.equal('stack' in response.body, false);
});

test('POST /api/v1/contact rejects whitespace-only fields', async () => {
  const contactService = buildService(async () => ({
    id: 'unused',
    createdAt: new Date().toISOString(),
  }));

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({
      name: '   ',
      email: '   ',
      subject: '   ',
      message: '   ',
    })
    .expect(422);

  assert.equal(response.body.success, false);
  assert.equal(response.body.errors.length, 4);
});

test('POST /api/v1/contact does not leak internal errors', async () => {
  const contactService = buildService(async () => {
    throw new Error('database connection failed: secret-detail');
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send(validPayload)
    .expect(500);

  assert.equal(response.body.success, false);
  assert.equal(
    response.body.message,
    'Something went wrong. Please try again later.',
  );
  assert.equal(JSON.stringify(response.body).includes('secret-detail'), false);
  assert.equal('stack' in response.body, false);
});

test('POST /api/v1/contact returns 400 for malformed JSON', async () => {
  const contactService = buildService(async () => ({
    id: 'unused',
    createdAt: new Date().toISOString(),
  }));

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .set('Content-Type', 'application/json')
    .send('{"name":')
    .expect(400);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Invalid JSON payload.');
});

test('POST /api/v1/contact returns 422 when the body is missing', async () => {
  const contactService = buildService(async () => ({
    id: 'unused',
    createdAt: new Date().toISOString(),
  }));

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app).post('/api/v1/contact').expect(422);

  assert.equal(response.body.success, false);
  assert.equal(response.body.errors.length, 4);
});

test('contact submissions are rate limited', async () => {
  const contactService = buildService(async () => ({
    id: '507f1f77bcf86cd799439011',
    createdAt: '2026-01-01T00:00:00.000Z',
  }));

  const app = createApp({ contactService, enableRateLimit: true });

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await request(app).post('/api/v1/contact').send(validPayload).expect(201);
  }

  const response = await request(app)
    .post('/api/v1/contact')
    .send(validPayload)
    .expect(429);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /too many requests/i);
});
