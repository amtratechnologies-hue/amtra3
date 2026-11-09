import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 64,
    },
    passwordHash: {
      type: String,
      required: true,
      // Never return the hash unless a query explicitly asks for it.
      select: false,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
      required: true,
    },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

export const Admin =
  mongoose.models.Admin || mongoose.model('Admin', adminSchema);
