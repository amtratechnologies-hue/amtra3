import { env } from '../config/env.js';
import { Admin } from '../models/Admin.js';
import logger from '../utils/logger.js';
import { hashPassword } from '../utils/password.js';

export const MIN_ADMIN_PASSWORD_LENGTH = 12;

/**
 * Idempotent administrator bootstrap. It never updates an existing account, so
 * an administrator's password is not reset on every server restart.
 */
export async function seedAdminIfEnabled({
  config = env.admin,
  model = Admin,
  log = logger,
} = {}) {
  if (!config.seedEnabled) {
    return { seeded: false, reason: 'disabled' };
  }

  if (!config.username || !config.initialPassword) {
    log.warn(
      'ADMIN_SEED_ENABLED is true but ADMIN_USERNAME or ADMIN_INITIAL_PASSWORD is missing. Skipping the admin seed.',
    );
    return { seeded: false, reason: 'missing-credentials' };
  }

  if (config.initialPassword.length < MIN_ADMIN_PASSWORD_LENGTH) {
    log.warn(
      `ADMIN_INITIAL_PASSWORD must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters. Skipping the admin seed.`,
    );
    return { seeded: false, reason: 'weak-password' };
  }

  const username = config.username.trim().toLowerCase();
  const existing = await model.findOne({ username });

  if (existing) {
    return { seeded: false, reason: 'exists' };
  }

  try {
    await model.create({
      username,
      passwordHash: await hashPassword(config.initialPassword),
      role: 'admin',
    });
  } catch (error) {
    // A concurrent instance may have created the same account between the
    // lookup and the insert. A duplicate key means the account now exists, so
    // the seed is still idempotent and must not overwrite it.
    if (error?.code === 11000) {
      return { seeded: false, reason: 'exists' };
    }

    throw error;
  }

  log.info('Initial administrator account created.');

  return { seeded: true, reason: 'created' };
}
