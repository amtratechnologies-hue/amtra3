import { HTTP_STATUS } from '../constants/httpStatus.js';
import { successResponse } from '../utils/apiResponse.js';

export function createContactController(contactService) {
  return {
    async submit(req, res) {
      const {
        fullName,
        email,
        phone,
        company,
        country,
        service,
        budget,
        timeline,
        description,
        contactMethod,
      } = req.body;

      const result = await contactService.submit({
        fullName,
        email,
        phone: phone || '',
        company: company || '',
        country: country || '',
        service,
        budget: budget || '',
        timeline: timeline || '',
        description,
        contactMethod: contactMethod || '',
      });

      res.status(HTTP_STATUS.CREATED).json(
        successResponse(
          'Thank you. Your project inquiry has been received and our team will review it shortly.',
          {
            id: result.id,
            receivedAt: result.receivedAt,
          },
        ),
      );
    },
  };
}
