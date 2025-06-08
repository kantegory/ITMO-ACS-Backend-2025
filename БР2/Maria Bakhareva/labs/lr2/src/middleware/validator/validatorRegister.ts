import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatorRegister = [
  check('firstName')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
    .withMessage('First name must contain only letters'),
  check('lastName')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
    .withMessage('Last name must contain only letters'),
  check('email')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character'),
  check('birthDate')
    .trim()
    .exists({ checkFalsy: true })
    .withMessage('Birth date is required')
    .isDate()
    .withMessage('Invalid date format')
    .custom((value) => {
      const birth = new Date(value);
      const today = new Date();

      if (birth >= today) {
        throw new Error('Birth date must be in the past');
      }

      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      if (age < 18) {
        throw new Error('You must be at least 18 years old to register');
      }

      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
