import mongoose from 'mongoose';
import {
  BUDGET_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../constants/inquiry.js';

const serviceRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    company: { type: String, trim: true, maxlength: 120, default: '' },
    country: { type: String, trim: true, maxlength: 80, default: '' },
    service: {
      type: String,
      required: true,
      trim: true,
      enum: SERVICE_OPTIONS,
    },
    budget: {
      type: String,
      trim: true,
      enum: [...BUDGET_OPTIONS, ''],
      default: '',
    },
    timeline: {
      type: String,
      trim: true,
      enum: [...TIMELINE_OPTIONS, ''],
      default: '',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    contactMethod: {
      type: String,
      trim: true,
      enum: [...CONTACT_METHOD_OPTIONS, ''],
      default: '',
    },
    notificationStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

serviceRequestSchema.index({ createdAt: -1 });

export const ServiceRequest =
  mongoose.models.ServiceRequest ||
  mongoose.model('ServiceRequest', serviceRequestSchema);
