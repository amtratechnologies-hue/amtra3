import { Admin } from '../models/Admin.js';
import { assertDatabaseConnected } from '../utils/database.js';

export function createAdminRepository({ model = Admin } = {}) {
  return {
    async findByUsername(username) {
      assertDatabaseConnected();

      return model
        .findOne({ username: String(username ?? '').trim().toLowerCase() })
        .select('+passwordHash')
        .lean();
    },

    async findById(id) {
      assertDatabaseConnected();
      return model.findById(id).lean();
    },

    async recordLogin(id) {
      assertDatabaseConnected();
      await model.updateOne({ _id: id }, { $set: { lastLoginAt: new Date() } });
    },

    async count() {
      assertDatabaseConnected();
      return model.countDocuments();
    },

    async create({ username, passwordHash, role = 'admin' }) {
      assertDatabaseConnected();

      return model.create({
        username: String(username).trim().toLowerCase(),
        passwordHash,
        role,
      });
    },
  };
}

export const adminRepository = createAdminRepository();
