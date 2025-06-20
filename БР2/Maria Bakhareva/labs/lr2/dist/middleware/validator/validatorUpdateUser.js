"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorUpdateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validatorUpdateUser = [
    (0, express_validator_1.check)('firstName')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long')
        .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
        .withMessage('First name must contain only letters'),
    (0, express_validator_1.check)('lastName')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long')
        .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
        .withMessage('Last name must contain only letters'),
    (0, express_validator_1.check)('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    (0, express_validator_1.check)('phone')
        .optional()
        .trim()
        .isMobilePhone('any')
        .withMessage('Invalid phone number'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
