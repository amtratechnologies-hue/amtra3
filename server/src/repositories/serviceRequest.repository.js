import mongoose from 'mongoose';
import { ServiceRequest } from '../models/ServiceRequest.js';
import { assertDatabaseConnected } from '../utils/database.js';

export function createServiceRequestRepository({ model = ServiceRequest } = {}) {
  return {
    async create(data) {
      assertDatabaseConnected();
      return model.create(data);
    },

    async list({ page = 1, limit = 20 } = {}) {
      assertDatabaseConnected();

      const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
      const safeLimit = Math.min(
        50,
        Math.max(1, Number.parseInt(limit, 10) || 20),
      );

      const [items, total] = await Promise.all([
        model
          .find()
          .sort({ createdAt: -1 })
          .skip((safePage - 1) * safeLimit)
          .limit(safeLimit)
          .lean(),
        model.countDocuments(),
      ]);

      return { items, total, page: safePage, limit: safeLimit };
    },

    async findById(id) {
      assertDatabaseConnected();

      if (!mongoose.isValidObjectId(id)) {
        return null;
      }

      return model.findById(id).lean();
    },

    async markNotificationStatus(id, status) {
      assertDatabaseConnected();

      if (!mongoose.isValidObjectId(id)) {
        return;
      }

      await model.updateOne(
        { _id: id },
        { $set: { notificationStatus: status } },
      );
    },
  };
}

export const serviceRequestRepository = createServiceRequestRepository();
