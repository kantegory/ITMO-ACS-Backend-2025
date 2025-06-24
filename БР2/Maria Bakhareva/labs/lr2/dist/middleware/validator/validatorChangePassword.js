"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorChangePassword = void 0;
const express_validator_1 = require("express-validator");
exports.validatorChangePassword = [
    (0, express_validator_1.check)('password')
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
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
