"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRequestController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const BookingRequest_1 = require("../entities/BookingRequest");
const User_1 = require("../entities/User");
const BaseController_1 = require("./BaseController");
exports.BookingRequestController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(BookingRequest_1.BookingRequest));
exports.BookingRequestController.getAll = async (req, res) => {
    try {
        if (req.payload) {
            const role = req.payload.role;
            const userId = req.payload.userId;
            if (role === User_1.UserRole.ADMIN) {
                const bookingRequests = await exports.BookingRequestController.repository.find();
                res.json(bookingRequests);
                return;
            }
            else if (role === User_1.UserRole.LANDLORD) {
                const bookingRequests = await exports.BookingRequestController.repository
                    .createQueryBuilder('booking_request')
                    .leftJoinAndSelect('booking_request.property', 'property')
                    .where('property.owner_id = :userId', { userId })
                    .getMany();
                res.json(bookingRequests);
                return;
            }
            else if (role === User_1.UserRole.TENANT) {
                const bookingRequests = await exports.BookingRequestController.repository.find({
                    where: { tenant: { id: userId } },
                });
                res.json(bookingRequests);
                return;
            }
        }
        res.status(403).json({ message: 'Forbidden' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.BookingRequestController.getById = async (req, res) => {
    try {
        if (req.payload) {
            const role = req.payload.role;
            const userId = req.payload.userId;
            const bookingRequestId = parseInt(req.params.id, 10);
            if (role === User_1.UserRole.ADMIN) {
                const bookingRequest = await exports.BookingRequestController.repository.findOne({
                    where: { id: bookingRequestId },
                });
                res.json(bookingRequest);
                return;
            }
            else if (role === User_1.UserRole.LANDLORD) {
                const bookingRequest = await exports.BookingRequestController.repository
                    .createQueryBuilder('booking_request')
                    .leftJoinAndSelect('booking_request.property', 'property')
                    .where('property.owner_id = :userId', { userId })
                    .andWhere('booking_request.id = :bookingRequestId', {
                    bookingRequestId,
                })
                    .getOne();
                res.json(bookingRequest);
                return;
            }
            else if (role === User_1.UserRole.TENANT) {
                const bookingRequest = await exports.BookingRequestController.repository.findOne({
                    where: { id: bookingRequestId, tenant: { id: userId } },
                });
                res.json(bookingRequest);
                return;
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
