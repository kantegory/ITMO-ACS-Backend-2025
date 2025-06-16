"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfig_1 = require("../config/databaseConfig");
const BookingRequest_1 = require("../entities/BookingRequest");
const User_1 = require("../entities/User");
class BookingRequestService {
    constructor() {
        this.repo = databaseConfig_1.AppDataSource.getRepository(BookingRequest_1.BookingRequest);
    }
    async create(data, user) {
        if (!user)
            throw { status: 403, message: 'User not authenticated' };
        if (user.role !== User_1.UserRole.TENANT)
            throw { status: 403, message: 'Access denied' };
        const br = this.repo.create({
            ...data,
            tenant: { id: user.userId },
            status: BookingRequest_1.BookingRequestStatus.CREATED,
        });
        return await this.repo.save(br);
    }
    async update(id, data, user) {
        if (!user)
            throw { status: 403, message: 'User not authenticated' };
        const br = await this.repo.findOne({
            where: { id },
            relations: ['tenant', 'property', 'property.owner'],
        });
        if (!br)
            throw { status: 404, message: 'Booking request not found' };
        const isTenant = user.role === User_1.UserRole.TENANT && br.tenant.id === user.userId;
        const isLandlord = user.role === User_1.UserRole.LANDLORD && br.property.owner.id === user.userId;
        const isAdmin = user.role === User_1.UserRole.ADMIN;
        if (!isTenant && !isLandlord && !isAdmin)
            throw { status: 403, message: 'Forbidden' };
        await this.repo.update(id, data);
        return this.repo.findOneBy({ id });
    }
    async getAll(user) {
        if (!user)
            throw { status: 403, message: 'Forbidden' };
        const { role, userId } = user;
        if (role === User_1.UserRole.ADMIN) {
            return this.repo.find();
        }
        if (role === User_1.UserRole.LANDLORD) {
            return this.repo
                .createQueryBuilder('booking_request')
                .leftJoinAndSelect('booking_request.property', 'property')
                .where('property.owner_id = :userId', { userId })
                .getMany();
        }
        return this.repo.find({ where: { tenant: { id: userId } } });
    }
    async getById(id, user) {
        if (!user)
            throw { status: 403, message: 'Forbidden' };
        const { role, userId } = user;
        if (role === User_1.UserRole.ADMIN) {
            return this.repo.findOne({ where: { id } });
        }
        if (role === User_1.UserRole.LANDLORD) {
            return this.repo
                .createQueryBuilder('booking_request')
                .leftJoinAndSelect('booking_request.property', 'property')
                .where('property.owner_id = :userId', { userId })
                .andWhere('booking_request.id = :id', { id })
                .getOne();
        }
        return this.repo.findOne({ where: { id, tenant: { id: userId } } });
    }
}
exports.default = new BookingRequestService();
