import { body } from 'express-validator';

export const adminLoginValidationRules = [
  body('username')
    .exists({ values: 'falsy' })
    .withMessage('Please enter your username.')
    .bail()
    .isString()
    .withMessage('Username must be text.')
    .bail()
    .trim()
    .isLength({ min: 3, max: 64 })
    .withMessage('Username must be between 3 and 64 characters.'),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Please enter your password.')
    .bail()
    .isString()
    .withMessage('Password must be text.')
    .bail()
    .isLength({ min: 1, max: 200 })
    .withMessage('Password must be 200 characters or fewer.'),
];
