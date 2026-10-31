import mongoose from 'mongoose';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      maxlength: 254,
      match: [emailPattern, 'Please provide a valid email address.'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required.'],
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      minlength: 20,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactMessageSchema.index({ createdAt: -1 });

const ContactMessage =
  mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
