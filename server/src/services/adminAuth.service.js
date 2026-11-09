import { adminRepository as defaultRepository } from '../repositories/admin.repository.js';
import logger from '../utils/logger.js';
import { verifyAgainstDummy, verifyPassword } from '../utils/password.js';

/**
 * Verify admin credentials. Returns a safe public admin object on success and
 * null on failure. The password hash never leaves this module.
 */
export function createAdminAuthService({
  repository = defaultRepository,
  log = logger,
} = {}) {
  return {
    async authenticate(username, password) {
      if (typeof username !== 'string' || typeof password !== 'string') {
        return null;
      }

      const normalizedUsername = username.trim().toLowerCase();

      if (!normalizedUsername || !password) {
        return null;
      }

      const admin = await repository.findByUsername(normalizedUsername);

      if (!admin) {
        // Spend roughly the same time as a real comparison so an attacker
        // cannot enumerate valid usernames from response timing.
        await verifyAgainstDummy(password);
        return null;
      }

      const isValid = await verifyPassword(password, admin.passwordHash);

      if (!isValid) {
        return null;
      }

      try {
        await repository.recordLogin(admin._id);
      } catch (error) {
        // A failed last-login timestamp update must not block authentication.
        log.warn('Admin last-login timestamp could not be updated.', {
          reason: error?.message || 'Unknown database error',
        });
      }

      return {
        id: String(admin._id),
        username: admin.username,
        role: admin.role,
      };
    },
  };
}

export const adminAuthService = createAdminAuthService();
