"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorBookingRequest = void 0;
const express_validator_1 = require("express-validator");
exports.validatorBookingRequest = [
    (0, express_validator_1.check)('propertyId')
        .exists({ checkFalsy: true })
        .withMessage('propertyId is required')
        .isInt({ min: 1 })
        .withMessage('propertyId must be a positive integer'),
    (0, express_validator_1.check)('requestedStartDate')
        .exists({ checkFalsy: true })
        .withMessage('requestedStartDate is required')
        .isISO8601()
        .withMessage('requestedStartDate must be a valid date'),
    (0, express_validator_1.check)('requestedEndDate')
        .exists({ checkFalsy: true })
        .withMessage('requestedEndDate is required')
        .isISO8601()
        .withMessage('requestedEndDate must be a valid date'),
    (0, express_validator_1.check)('status')
        .optional()
        .isString()
        .withMessage('status must be a string'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
