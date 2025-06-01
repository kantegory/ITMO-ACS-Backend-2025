import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { BookingRequestStatus } from '../../entities/BookingRequest';

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
    .withMessage('status must be a string')
    .isIn(Object.values(BookingRequestStatus))
    .withMessage(
      `status must be one of: ${Object.values(BookingRequestStatus).join(', ')}`,
    ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
