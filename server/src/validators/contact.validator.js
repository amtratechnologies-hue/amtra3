import { body } from 'express-validator';
import {
  BUDGET_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from '../constants/inquiry.js';

const PHONE_PATTERN = /^\+?[\d\s().-]{6,30}$/;

export const contactValidationRules = [
  body('fullName')
    .exists({ values: 'falsy' })
    .withMessage('Please enter your full name.')
    .bail()
    .isString()
    .withMessage('Full name must be text.')
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters.'),

  body('email')
    .exists({ values: 'falsy' })
    .withMessage('Please enter your business email address.')
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

  body('phone')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Phone number must be text.')
    .bail()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone number must be 30 characters or fewer.')
    .bail()
    .matches(PHONE_PATTERN)
    .withMessage(
      'Please enter a valid phone number, including the country code.',
    ),

  body('company')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Company name must be text.')
    .bail()
    .trim()
    .isLength({ max: 120 })
    .withMessage('Company name must be 120 characters or fewer.'),

  body('country')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Country must be text.')
    .bail()
    .trim()
    .isLength({ max: 80 })
    .withMessage('Country must be 80 characters or fewer.'),

  body('service')
    .exists({ values: 'falsy' })
    .withMessage('Please select the service you need.')
    .bail()
    .isString()
    .withMessage('Service must be text.')
    .bail()
    .trim()
    .isIn(SERVICE_OPTIONS)
    .withMessage('Please select a valid service.'),

  body('budget')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Budget must be text.')
    .bail()
    .trim()
    .isIn(BUDGET_OPTIONS)
    .withMessage('Please select a valid budget range.'),

  body('timeline')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Timeline must be text.')
    .bail()
    .trim()
    .isIn(TIMELINE_OPTIONS)
    .withMessage('Please select a valid timeline.'),

  body('description')
    .exists({ values: 'falsy' })
    .withMessage('Please describe your project.')
    .bail()
    .isString()
    .withMessage('Project description must be text.')
    .bail()
    .trim()
    .isLength({ min: 20, max: 5000 })
    .withMessage('Project description must be between 20 and 5,000 characters.'),

  body('contactMethod')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Preferred contact method must be text.')
    .bail()
    .trim()
    .isIn(CONTACT_METHOD_OPTIONS)
    .withMessage('Please select a valid contact method.'),

  body('consent')
    .custom((value) => value === true || value === 'true')
    .withMessage(
      'Please confirm that AMTRA Technologies may contact you about your inquiry.',
    ),

  body('website')
    .custom((value) => !value)
    .withMessage('Invalid submission.'),
];
