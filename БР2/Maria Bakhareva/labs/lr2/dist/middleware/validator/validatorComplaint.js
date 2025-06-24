"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorComplaint = void 0;
const express_validator_1 = require("express-validator");
exports.validatorComplaint = [
    (0, express_validator_1.check)('propertyId')
        .exists({ checkFalsy: true })
        .withMessage('propertyId is required')
        .isInt({ min: 1 })
        .withMessage('propertyId must be a positive integer'),
    (0, express_validator_1.check)('message')
        .exists({ checkFalsy: true })
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 5 })
        .withMessage('Description must be at least 5 characters long'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
