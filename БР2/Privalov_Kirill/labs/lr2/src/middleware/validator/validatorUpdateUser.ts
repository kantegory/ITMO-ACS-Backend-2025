import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorUpdateUser = [
  check('firstName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
    .withMessage('First name must contain only letters'),
  check('lastName')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
    .withMessage('Last name must contain only letters'),
  check('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  check('phone')
    .optional()
    .trim()
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
