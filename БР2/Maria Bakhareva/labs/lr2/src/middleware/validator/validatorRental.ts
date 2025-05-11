import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { RentalStatus } from '../../entities/Rental';

export const validatorRental = [
  check('tenantId')
    .exists({ checkFalsy: true })
    .withMessage('tenantId is required')
    .isInt({ min: 1 })
    .withMessage('tenantId must be a positive integer'),
  check('propertyId')
    .exists({ checkFalsy: true })
    .withMessage('propertyId is required')
    .isInt({ min: 1 })
    .withMessage('propertyId must be a positive integer'),
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('startDate is required')
    .isISO8601()
    .withMessage('startDate must be a valid date'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('endDate is required')
    .isISO8601()
    .withMessage('endDate must be a valid date'),
  check('status')
    .exists({ checkFalsy: true })
    .withMessage('status is required')
    .isString()
    .withMessage('status must be a string')
    .isIn(Object.values(RentalStatus))
    .withMessage(
      `status must be one of the following: ${Object.values(RentalStatus).join(', ')}`,
    ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { startDate, endDate } = req.body;
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        errors: [
          {
            msg: 'startDate must be before endDate',
            param: 'startDate',
            location: 'body',
          },
        ],
      });
    }
    next();
  },
];