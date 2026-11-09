import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { env } from '../src/config/env.js';

const validPayload = {
  fullName: '  Ada Lovelace  ',
  email: '  Ada@Example.com ',
  phone: '+92 300 1234567',
  company: ' Analytical Engines ',
  country: ' Pakistan ',
  service: 'Web Development',
  budget: '$500 \u2013 $1,000',
  timeline: '1\u20133 Months',
  description:
    'We need a modern web application for our operations team and field staff.',
  contactMethod: 'Email',
  consent: true,
};

function buildService(submit) {
  return { submit };
}

function buildResult(id = 'request_123') {
  return {
    id,
    receivedAt: '2026-01-01T00:00:00.000Z',
  };
}

test('POST /api/v1/contact accepts a valid inquiry and returns 201', async () => {
  let receivedPayload;
  let submitCalls = 0;

  const contactService = buildService(async (payload) => {
    submitCalls += 1;
    receivedPayload = payload;
    return buildResult();
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send(validPayload)
    .expect(201);

  assert.equal(response.body.success, true);
  assert.equal(response.body.data.id, 'request_123');
  assert.equal(response.body.data.receivedAt, '2026-01-01T00:00:00.000Z');
  assert.equal('acknowledgementSent' in response.body.data, false);
  assert.equal(submitCalls, 1, 'one request must trigger exactly one submission');

  assert.deepEqual(receivedPayload, {
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+92 300 1234567',
    company: 'Analytical Engines',
    country: 'Pakistan',
    service: 'Web Development',
    budget: '$500 \u2013 $1,000',
    timeline: '1\u20133 Months',
    description:
      'We need a modern web application for our operations team and field staff.',
    contactMethod: 'Email',
  });
});

test('POST /api/v1/contact accepts an inquiry without optional fields', async () => {
  let receivedPayload;

  const contactService = buildService(async (payload) => {
    receivedPayload = payload;
    return buildResult('request_456');
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      service: 'Custom Software Development',
      description: 'We need help choosing the right technology for a new product.',
      consent: true,
    })
    .expect(201);

  assert.equal(response.body.success, true);
  assert.equal(receivedPayload.phone, '');
  assert.equal(receivedPayload.company, '');
  assert.equal(receivedPayload.country, '');
  assert.equal(receivedPayload.budget, '');
  assert.equal(receivedPayload.timeline, '');
  assert.equal(receivedPayload.contactMethod, '');
});

test('POST /api/v1/contact returns 422 with field errors for invalid input', async () => {
  let serviceCalled = false;

  const contactService = buildService(async () => {
    serviceCalled = true;
    return buildResult();
  });

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({
      fullName: 'A',
      email: 'not-an-email',
      phone: 'abc',
      service: 'Unknown Service',
      budget: 'One million dollars',
      timeline: 'Yesterday',
      description: 'too short',
      contactMethod: 'Carrier pigeon',
      consent: false,
    })
    .expect(422);

  assert.equal(serviceCalled, false);
  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Please correct the highlighted fields.');

  const fields = response.body.errors.map((error) => error.field);
  assert.deepEqual(
    new Set(fields),
    new Set([
      'fullName',
      'email',
      'phone',
      'service',
      'budget',
      'timeline',
      'description',
      'contactMethod',
      'consent',
    ]),
  );

  for (const error of response.body.errors) {
    assert.equal(typeof error.message, 'string');
    assert.ok(error.message.length > 0);
  }

  assert.equal('stack' in response.body, false);
});

test('POST /api/v1/contact rejects whitespace-only required fields', async () => {
  const contactService = buildService(async () => buildResult());

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({
      fullName: '   ',
      email: '   ',
      service: '   ',
      description: '   ',
      consent: true,
    })
    .expect(422);

  assert.equal(response.body.success, false);

  const fields = response.body.errors.map((error) => error.field);
  assert.deepEqual(
    new Set(fields),
    new Set(['fullName', 'email', 'service', 'description']),
  );
});

test('POST /api/v1/contact rejects a filled honeypot field', async () => {
  const contactService = buildService(async () => buildResult());

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .send({ ...validPayload, website: 'https://spam.example' })
    .expect(422);

  assert.equal(response.body.success, false);
  assert.ok(response.body.errors.some((error) => error.field === 'website'));
});

test('POST /api/v1/contact does not leak internal errors', async () => {
  const contactService = buildService(async () => {
    throw new Error('SMTP failed: secret-detail');
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
  const contactService = buildService(async () => buildResult());

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app)
    .post('/api/v1/contact')
    .set('Content-Type', 'application/json')
    .send('{"fullName":')
    .expect(400);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Invalid JSON payload.');
});

test('POST /api/v1/contact returns 422 when the body is missing', async () => {
  const contactService = buildService(async () => buildResult());

  const app = createApp({ contactService, enableRateLimit: false });

  const response = await request(app).post('/api/v1/contact').expect(422);

  assert.equal(response.body.success, false);
  assert.ok(response.body.errors.length >= 4);
});

test('contact submissions are rate limited', async () => {
  const contactService = buildService(async () => buildResult());

  const app = createApp({ contactService, enableRateLimit: true });
  const limit = env.contactRateLimit.max;

  for (let attempt = 0; attempt < limit; attempt += 1) {
    await request(app).post('/api/v1/contact').send(validPayload).expect(201);
  }

  const response = await request(app)
    .post('/api/v1/contact')
    .send(validPayload)
    .expect(429);

  assert.equal(response.body.success, false);
  assert.match(response.body.message, /too many project inquiry attempts/i);
  assert.match(response.body.message, /try again in/i);

  const retryAfter = Number.parseInt(response.headers['retry-after'], 10);
  assert.ok(Number.isFinite(retryAfter) && retryAfter > 0);
});
