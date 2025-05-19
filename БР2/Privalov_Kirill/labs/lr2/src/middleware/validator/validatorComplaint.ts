import { ComplaintStatus } from './../../entities/Complaint';
import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorComplaint = [
  check('propertyId')
    .exists({ checkFalsy: true })
    .withMessage('propertyId is required')
    .isInt({ min: 1 })
    .withMessage('propertyId must be a positive integer'),
  check('message')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 5 })
    .withMessage('Description must be at least 5 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
