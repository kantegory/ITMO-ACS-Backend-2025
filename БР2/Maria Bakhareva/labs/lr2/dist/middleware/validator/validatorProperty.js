"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorProperty = void 0;
const express_validator_1 = require("express-validator");
exports.validatorProperty = [
    (0, express_validator_1.check)('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
    (0, express_validator_1.check)('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),
    (0, express_validator_1.check)('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required')
        .isString()
        .withMessage('Address must be a string'),
    (0, express_validator_1.check)('price')
        .exists({ checkFalsy: true })
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.check)('type')
        .exists({ checkFalsy: true })
        .withMessage('Type is required')
        .isString()
        .withMessage('Type must be a string'),
    (0, express_validator_1.check)('ownerId')
        .exists({ checkFalsy: true })
        .withMessage('ownerId is required')
        .isInt({ min: 1 })
        .withMessage('ownerId must be a positive integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    },
];
