import { body } from 'express-validator';

export const contactValidationRules = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Name is required.')
    .bail()
    .isString()
    .withMessage('Name must be text.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters.'),

  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Email is required.')
    .bail()
    .isString()
    .withMessage('Email must be text.')
    .bail()
    .trim()
    .isLength({ max: 254 })
    .withMessage('Email must be 254 characters or fewer.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),

  body('subject')
    .exists({ values: 'falsy' })
    .withMessage('Subject is required.')
    .bail()
    .isString()
    .withMessage('Subject must be text.')
    .bail()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Subject must be between 3 and 120 characters.'),

  body('message')
    .exists({ values: 'falsy' })
    .withMessage('Message is required.')
    .bail()
    .isString()
    .withMessage('Message must be text.')
    .bail()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Message must be between 20 and 2000 characters.'),
];
