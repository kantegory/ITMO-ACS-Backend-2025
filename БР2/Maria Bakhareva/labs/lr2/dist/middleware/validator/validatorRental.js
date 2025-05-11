"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorRental = void 0;
const express_validator_1 = require("express-validator");
const Rental_1 = require("../../entities/Rental");
exports.validatorRental = [
    (0, express_validator_1.check)('tenantId')
        .exists({ checkFalsy: true })
        .withMessage('tenantId is required')
        .isInt({ min: 1 })
        .withMessage('tenantId must be a positive integer'),
    (0, express_validator_1.check)('propertyId')
        .exists({ checkFalsy: true })
        .withMessage('propertyId is required')
        .isInt({ min: 1 })
        .withMessage('propertyId must be a positive integer'),
    (0, express_validator_1.check)('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required')
        .isISO8601()
        .withMessage('startDate must be a valid date'),
    (0, express_validator_1.check)('endDate')
        .exists({ checkFalsy: true })
        .withMessage('endDate is required')
        .isISO8601()
        .withMessage('endDate must be a valid date'),
    (0, express_validator_1.check)('status')
        .exists({ checkFalsy: true })
        .withMessage('status is required')
        .isString()
        .withMessage('status must be a string')
        .isIn(Object.values(Rental_1.RentalStatus))
        .withMessage(`status must be one of the following: ${Object.values(Rental_1.RentalStatus).join(', ')}`),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { startDate, endDate } = req.body;
        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'startDate must be before endDate',
                        param: 'startDate',
                        location: 'body',
                    },
                ],
            });
        }
        next();
    },
];
