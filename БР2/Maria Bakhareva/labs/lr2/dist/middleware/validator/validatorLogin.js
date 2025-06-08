"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorLogin = void 0;
const express_validator_1 = require("express-validator");
exports.validatorLogin = [
    (0, express_validator_1.check)('email')
        .trim()
        .exists({ checkFalsy: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address'),
    (0, express_validator_1.check)('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
