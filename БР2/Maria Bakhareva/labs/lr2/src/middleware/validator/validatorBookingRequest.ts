import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorBookingRequest = [
  check('propertyId')
    .exists({ checkFalsy: true })
    .withMessage('propertyId is required')
    .isInt({ min: 1 })
    .withMessage('propertyId must be a positive integer'),
  check('requestedStartDate')
    .exists({ checkFalsy: true })
    .withMessage('requestedStartDate is required')
    .isISO8601()
    .withMessage('requestedStartDate must be a valid date'),
  check('requestedEndDate')
    .exists({ checkFalsy: true })
    .withMessage('requestedEndDate is required')
    .isISO8601()
    .withMessage('requestedEndDate must be a valid date'),
  check('status')
    .optional()
    .isString()
    .withMessage('status must be a string'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];