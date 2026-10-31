import ContactMessage from '../models/contactMessage.model.js';

export function createContactService({ model = ContactMessage } = {}) {
  return {
    async submit({ name, email, subject, message }) {
      const document = await model.create({
        name,
        email,
        subject,
        message,
      });

      return {
        id: document._id.toString(),
        createdAt: document.createdAt.toISOString(),
      };
    },
  };
}

export const contactService = createContactService();
