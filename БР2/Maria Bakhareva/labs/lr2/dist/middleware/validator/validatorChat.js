"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorCreateMessage = exports.validatorCreateChat = void 0;
const express_validator_1 = require("express-validator");
exports.validatorCreateChat = [
    (0, express_validator_1.check)('rentalId')
        .exists({ checkFalsy: true })
        .withMessage('rentalId is required')
        .isInt({ min: 1 })
        .withMessage('rentalId must be a positive integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
exports.validatorCreateMessage = [
    (0, express_validator_1.check)('message')
        .exists({ checkFalsy: true })
        .withMessage('Message is required')
        .isString()
        .withMessage('Message must be a string')
        .isLength({ min: 10 })
        .withMessage('Message must be at least 10 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
