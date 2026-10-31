import { HTTP_STATUS } from '../constants/httpStatus.js';
import { successResponse } from '../utils/apiResponse.js';

export function createContactController(contactService) {
  return {
    async submit(req, res) {
      const { name, email, subject, message } = req.body;

      const result = await contactService.submit({
        name,
        email,
        subject,
        message,
      });

      res.status(HTTP_STATUS.CREATED).json(
        successResponse('Thank you — your message has been received.', {
          id: result.id,
          receivedAt: result.createdAt,
        }),
      );
    },
  };
}
