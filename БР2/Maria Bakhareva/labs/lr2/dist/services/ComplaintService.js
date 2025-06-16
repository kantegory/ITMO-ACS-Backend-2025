"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfig_1 = require("../config/databaseConfig");
const Complaint_1 = require("../entities/Complaint");
const Property_1 = require("../entities/Property");
const User_1 = require("../entities/User");
class ComplaintService {
    constructor() {
        this.repo = databaseConfig_1.AppDataSource.getRepository(Complaint_1.Complaint);
        this.propertyRepo = databaseConfig_1.AppDataSource.getRepository(Property_1.Property);
        this.userRepo = databaseConfig_1.AppDataSource.getRepository(User_1.User);
    }
    async create(payload, message, propertyId) {
        if (!payload)
            throw { status: 401, message: 'Unauthorized' };
        if (payload.role !== User_1.UserRole.TENANT) {
            throw { status: 403, message: 'Only tenants can create complaints' };
        }
        if (!message || !propertyId) {
            throw { status: 400, message: 'Message and propertyId are required' };
        }
        const property = await this.propertyRepo.findOneBy({ id: propertyId });
        if (!property)
            throw { status: 404, message: 'Property not found' };
        const user = await this.userRepo.findOneBy({ id: payload.userId });
        if (!user)
            throw { status: 404, message: 'User not found' };
        const complaint = this.repo.create({
            message,
            property,
            user,
            status: Complaint_1.ComplaintStatus.CREATED,
        });
        return this.repo.save(complaint);
    }
    async getAll(payload) {
        if (!payload)
            throw { status: 401, message: 'Unauthorized' };
        const { role, userId } = payload;
        if (role === User_1.UserRole.ADMIN) {
            return this.repo.find();
        }
        else if (role === User_1.UserRole.LANDLORD) {
            return this.repo
                .createQueryBuilder('complaint')
                .leftJoinAndSelect('complaint.property', 'property')
                .where('property.owner_id = :userId', { userId })
                .getMany();
        }
        else if (role === User_1.UserRole.TENANT) {
            return this.repo.find({ where: { user: { id: userId } } });
        }
        else {
            throw { status: 403, message: 'Access denied' };
        }
    }
    async getById(payload, id) {
        if (!payload)
            throw { status: 401, message: 'Unauthorized' };
        const { role, userId } = payload;
        if (role === User_1.UserRole.ADMIN) {
            const c = await this.repo.findOneBy({ id });
            if (!c)
                throw { status: 404, message: 'Complaint not found' };
            return c;
        }
        if (role === User_1.UserRole.LANDLORD) {
            const c = await this.repo
                .createQueryBuilder('complaint')
                .leftJoinAndSelect('complaint.property', 'property')
                .where('property.owner_id = :userId', { userId })
                .andWhere('complaint.id = :id', { id })
                .getOne();
            if (!c)
                throw { status: 404, message: 'Complaint not found' };
            return c;
        }
        if (role === User_1.UserRole.TENANT) {
            const c = await this.repo.findOne({
                where: { id, user: { id: userId } },
            });
            if (!c)
                throw { status: 404, message: 'Complaint not found' };
            return c;
        }
        throw { status: 403, message: 'Access denied' };
    }
}
exports.default = new ComplaintService();
