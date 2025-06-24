import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorProperty = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  check('type')
    .exists({ checkFalsy: true })
    .withMessage('Type is required')
    .isString()
    .withMessage('Type must be a string'),
  check('ownerId')
    .exists({ checkFalsy: true })
    .withMessage('ownerId is required')
    .isInt({ min: 1 })
    .withMessage('ownerId must be a positive integer'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];