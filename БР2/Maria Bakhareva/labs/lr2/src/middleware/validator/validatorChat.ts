import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorCreateChat = [
  check('rentalId')
    .exists({ checkFalsy: true })
    .withMessage('rentalId is required')
    .isInt({ min: 1 })
    .withMessage('rentalId must be a positive integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export const validatorCreateMessage = [
  check('message')
    .exists({ checkFalsy: true })
    .withMessage('Message is required')
    .isString()
    .withMessage('Message must be a string')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
