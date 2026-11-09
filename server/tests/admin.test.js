import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import session from 'express-session';
import { createApp } from '../src/app.js';

const admin = {
  id: 'admin-1',
  username: 'amtratechnologies123',
  role: 'admin',
};

const requests = [
  {
    _id: '507f1f77bcf86cd799439011',
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+92 300 1234567',
    company: 'Analytical Engines',
    country: 'Pakistan',
    service: 'Web Development',
    budget: '$1,000 \u2013 $3,000',
    timeline: '1\u20133 Months',
    description: 'Build a web application for our operations team.',
    contactMethod: 'Email',
    createdAt: new Date('2026-01-01T10:00:00.000Z'),
  },
];

function createRepository() {
  return {
    async list({ page = 1, limit = 20 } = {}) {
      const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
      const safeLimit = Math.min(
        50,
        Math.max(1, Number.parseInt(limit, 10) || 20),
      );
      const start = (safePage - 1) * safeLimit;

      return {
        items: requests.slice(start, start + safeLimit),
        total: requests.length,
        page: safePage,
        limit: safeLimit,
      };
    },
    async findById(id) {
      return requests.find((entry) => entry._id === id) || null;
    },
  };
}

const adminAuthService = {
  async authenticate(username, password) {
    if (
      username === 'amtratechnologies123' &&
      password === 'StrongPassword123'
    ) {
      return admin;
    }

    return null;
  },
};

const sessionMiddleware = session({
  name: 'amtra_admin_sid',
  secret: 'test-session-secret-that-is-long-enough',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/api/v1/admin',
  },
});

function buildApp() {
  return createApp({
    adminAuthService,
    serviceRequestRepository: createRepository(),
    sessionMiddleware,
    enableRateLimit: false,
  });
}

async function login(agent) {
  const response = await agent
    .post('/api/v1/admin/login')
    .send({
      username: 'amtratechnologies123',
      password: 'StrongPassword123',
    })
    .expect(200);

  return response.body.data;
}

test('admin routes reject unauthenticated requests with 401', async () => {
  const app = buildApp();

  await request(app).get('/api/v1/admin/me').expect(401);
  await request(app).get('/api/v1/admin/requests').expect(401);
  await request(app)
    .get('/api/v1/admin/requests/507f1f77bcf86cd799439011')
    .expect(401);
});

test('admin login rejects invalid credentials with 401', async () => {
  const app = buildApp();

  const response = await request(app)
    .post('/api/v1/admin/login')
    .send({ username: 'amtratechnologies123', password: 'wrong-password' })
    .expect(401);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Invalid username or password.');
  assert.equal(JSON.stringify(response.body).includes('passwordHash'), false);
});

test('admin login validates the request body', async () => {
  const app = buildApp();

  const response = await request(app)
    .post('/api/v1/admin/login')
    .send({ username: '', password: '' })
    .expect(422);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Please correct the highlighted fields.');

  const fields = response.body.errors.map((error) => error.field);
  assert.deepEqual(new Set(fields), new Set(['username', 'password']));
});

test('admin login rejects untrusted origins', async () => {
  const app = buildApp();

  await request(app)
    .post('/api/v1/admin/login')
    .set('Origin', 'https://evil.example')
    .send({
      username: 'amtratechnologies123',
      password: 'StrongPassword123',
    })
    .expect(403);
});

test('valid admin login sets a secure HTTP-only session cookie', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  const response = await agent
    .post('/api/v1/admin/login')
    .send({
      username: 'amtratechnologies123',
      password: 'StrongPassword123',
    })
    .expect(200);

  assert.equal(response.body.success, true);
  assert.deepEqual(response.body.data.admin, admin);
  assert.match(response.body.data.csrfToken, /^[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(response.body).includes('passwordHash'), false);

  const setCookie = response.headers['set-cookie']?.join(';') || '';
  assert.match(setCookie, /amtra_admin_sid=/);
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
  assert.match(setCookie, /Path=\/api\/v1\/admin/i);
});

test('an authenticated session survives a refresh via GET /me', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  await login(agent);

  const response = await agent.get('/api/v1/admin/me').expect(200);

  assert.equal(response.body.success, true);
  assert.deepEqual(response.body.data.admin, admin);
  assert.match(response.body.data.csrfToken, /^[a-f0-9]{64}$/);
});

test('authenticated admins can list service requests', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  await login(agent);

  const response = await agent.get('/api/v1/admin/requests').expect(200);

  assert.equal(response.body.success, true);
  assert.equal(response.body.data.items.length, 1);
  assert.equal(response.body.data.pagination.total, 1);
  assert.deepEqual(response.body.data.items[0], {
    id: '507f1f77bcf86cd799439011',
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    service: 'Web Development',
    createdAt: '2026-01-01T10:00:00.000Z',
  });
});

test('authenticated admins can read the complete request details', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  await login(agent);

  const response = await agent
    .get('/api/v1/admin/requests/507f1f77bcf86cd799439011')
    .expect(200);

  assert.deepEqual(response.body.data.request, {
    id: '507f1f77bcf86cd799439011',
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    phone: '+92 300 1234567',
    company: 'Analytical Engines',
    country: 'Pakistan',
    service: 'Web Development',
    budget: '$1,000 \u2013 $3,000',
    timeline: '1\u20133 Months',
    description: 'Build a web application for our operations team.',
    contactMethod: 'Email',
    createdAt: '2026-01-01T10:00:00.000Z',
  });
});

test('a missing request returns 404 without leaking internals', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  await login(agent);

  const response = await agent
    .get('/api/v1/admin/requests/507f1f77bcf86cd799439012')
    .expect(404);

  assert.equal(response.body.success, false);
  assert.equal(response.body.message, 'Service request not found.');
});

test('logout requires a valid CSRF token and invalidates the session', async () => {
  const app = buildApp();
  const agent = request.agent(app);

  const { csrfToken } = await login(agent);

  await agent.post('/api/v1/admin/logout').expect(403);

  await agent
    .post('/api/v1/admin/logout')
    .set('X-CSRF-Token', csrfToken)
    .expect(200);

  await agent.get('/api/v1/admin/me').expect(401);
});
