import assert from 'node:assert/strict';
import test from 'node:test';
import { seedAdminIfEnabled } from '../src/services/adminSeed.service.js';
import { verifyPassword } from '../src/utils/password.js';

const silentLog = {
  info() {},
  warn() {},
  error() {},
};

function createModel() {
  const documents = [];

  return {
    documents,
    async findOne({ username }) {
      return documents.find((document) => document.username === username) || null;
    },
    async create(document) {
      documents.push(document);
      return document;
    },
  };
}

const config = {
  seedEnabled: true,
  username: 'amtratechnologies123',
  initialPassword: 'StrongPassword123',
};

test('creates the initial administrator with a bcrypt hash', async () => {
  const model = createModel();

  const result = await seedAdminIfEnabled({ config, model, log: silentLog });

  assert.equal(result.seeded, true);
  assert.equal(model.documents.length, 1);
  assert.equal(model.documents[0].username, 'amtratechnologies123');
  assert.equal(model.documents[0].role, 'admin');
  assert.notEqual(model.documents[0].passwordHash, config.initialPassword);
  assert.equal(
    await verifyPassword(config.initialPassword, model.documents[0].passwordHash),
    true,
  );
});

test('is idempotent and never overwrites an existing password', async () => {
  const model = createModel();

  await seedAdminIfEnabled({ config, model, log: silentLog });
  const originalHash = model.documents[0].passwordHash;

  const result = await seedAdminIfEnabled({
    config: { ...config, initialPassword: 'AnotherStrongPass123' },
    model,
    log: silentLog,
  });

  assert.equal(result.seeded, false);
  assert.equal(result.reason, 'exists');
  assert.equal(model.documents.length, 1);
  assert.equal(model.documents[0].passwordHash, originalHash);
});

test('does nothing when the seed is disabled', async () => {
  const model = createModel();

  const result = await seedAdminIfEnabled({
    config: { ...config, seedEnabled: false },
    model,
    log: silentLog,
  });

  assert.equal(result.seeded, false);
  assert.equal(result.reason, 'disabled');
  assert.equal(model.documents.length, 0);
});

test('refuses a weak initial password', async () => {
  const model = createModel();

  const result = await seedAdminIfEnabled({
    config: { ...config, initialPassword: 'short' },
    model,
    log: silentLog,
  });

  assert.equal(result.seeded, false);
  assert.equal(result.reason, 'weak-password');
  assert.equal(model.documents.length, 0);
});

test('refuses missing bootstrap credentials', async () => {
  const model = createModel();

  const result = await seedAdminIfEnabled({
    config: { ...config, initialPassword: '' },
    model,
    log: silentLog,
  });

  assert.equal(result.seeded, false);
  assert.equal(result.reason, 'missing-credentials');
  assert.equal(model.documents.length, 0);
});
