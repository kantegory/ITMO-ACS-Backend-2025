"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Complaint_1 = require("../entities/Complaint");
const User_1 = require("../entities/User");
const BaseController_1 = require("./BaseController");
exports.ComplaintController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(Complaint_1.Complaint));
exports.ComplaintController.getAll = async (req, res) => {
    try {
        if (req.payload) {
            const role = req.payload.role;
            const userId = req.payload.userId;
            if (role === User_1.UserRole.ADMIN) {
                const complaints = await exports.ComplaintController.repository.find();
                res.json(complaints);
                return;
            }
            else if (role === User_1.UserRole.LANDLORD) {
                const complaints = await exports.ComplaintController.repository
                    .createQueryBuilder('complaint')
                    .leftJoinAndSelect('complaint.property', 'property')
                    .where('property.owner_id = :userId', { userId })
                    .getMany();
                res.json(complaints);
                return;
            }
            else if (role === User_1.UserRole.TENANT) {
                const complaints = await exports.ComplaintController.repository.find({
                    where: { user: { id: userId } },
                });
                res.json(complaints);
                return;
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.ComplaintController.getById = async (req, res) => {
    try {
        if (req.payload) {
            const role = req.payload.role;
            const userId = req.payload.userId;
            const complaintId = req.params.id;
            if (role === User_1.UserRole.ADMIN) {
                const complaint = await exports.ComplaintController.repository.findOne({
                    where: { id: Number(complaintId) },
                });
                res.json(complaint);
                return;
            }
            else if (role === User_1.UserRole.LANDLORD) {
                const complaint = await exports.ComplaintController.repository
                    .createQueryBuilder('complaint')
                    .leftJoinAndSelect('complaint.property', 'property')
                    .where('property.owner_id = :userId', { userId })
                    .andWhere('complaint.id = :complaintId', { complaintId })
                    .getOne();
                res.json(complaint);
                return;
            }
            else if (role === User_1.UserRole.TENANT) {
                const complaint = await exports.ComplaintController.repository.findOne({
                    where: { id: Number(complaintId), user: { id: userId } },
                });
                res.json(complaint);
                return;
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
