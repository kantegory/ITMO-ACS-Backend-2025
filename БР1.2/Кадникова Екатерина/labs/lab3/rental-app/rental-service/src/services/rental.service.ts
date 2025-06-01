import { AppDataSource } from "../config/database";
import { Rental } from "../models/rental.entity";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rental.dto";
import { RentalStatus } from "../models/rental-status.enum";
import userClient from "./user.client";
import propertyClient from "./property.client";
import { Request } from 'express';

export class RentalService {
    private rentalRepository = AppDataSource.getRepository(Rental);

    async getAllRentals(req: Request) {
        const rentals = await this.rentalRepository.find({
            order: { startedAt: 'DESC' }
        });
        return this.enrichRentals(rentals, req);
    }

    async getRentalById(id: number, userId: number, isAdmin: boolean, req: Request) {
        const rental = await this.rentalRepository.findOneBy({ id });
        if (!rental) {
            throw new Error("Rental not found");
        }

        const enrichedRental = await this.enrichRental(rental, req);
        const isTenant = enrichedRental.tenant.id === userId;
        const isOwner = enrichedRental.property.ownerId === userId;

        if (!isTenant && !isOwner && !isAdmin) {
            throw new Error("Forbidden");
        }

        return enrichedRental;
    }

    async getUserRentals(userId: number, req: Request) {
        const rentals = await this.rentalRepository.find({
            where: { tenantId: userId },
            order: { startedAt: 'DESC' }
        });
        return this.enrichRentals(rentals, req);
    }

    async createRental(dto: CreateRentalDto, userId: number, req: Request) {
        const startDate = new Date(dto.startedAt);
        const endDate = new Date(dto.endedAt);

        if (startDate >= endDate) {
            throw new Error("End date must be after start date");
        }

        const [property, tenant] = await Promise.all([
            propertyClient.getPropertyById(dto.propertyId, req),
            userClient.getUserById(userId, req)
        ]);

        if (!property || !tenant) {
            throw new Error("Missing required entities");
        }

        const conflictingRental = await this.rentalRepository
            .createQueryBuilder('rental')
            .where('rental.propertyId = :propertyId', { propertyId: dto.propertyId })
            .andWhere('rental.status = :status', { status: RentalStatus.ACTIVE })
            .andWhere('(rental.startedAt <= :ended AND rental.endedAt >= :started)', {
                started: startDate,
                ended: endDate
            })
            .getOne();

        if (conflictingRental) {
            throw new Error("Property is already rented for selected dates");
        }

        const rental = this.rentalRepository.create({
            propertyId: property.id,
            tenantId: tenant.id,
            startedAt: startDate,
            endedAt: endDate,
            status: RentalStatus.ACTIVE
        });

        await this.rentalRepository.save(rental);
        return this.getRentalById(rental.id, userId, false, req);
    }

    async updateRentalStatus(rentalId: number, status: string, userId: number, isAdmin: boolean, req: Request) {
        if (!Object.values(RentalStatus).includes(status as RentalStatus)) {
            throw new Error("Invalid status value");
        }

        const rental = await this.getRentalById(rentalId, userId, isAdmin, req);
        rental.status = status as RentalStatus;

        await this.rentalRepository.save(rental);
        return rental;
    }

    async updateRental(rentalId: number, dto: UpdateRentalDto, userId: number, isAdmin: boolean, req: Request) {
        const rental = await this.getRentalById(rentalId, userId, isAdmin, req);

        if (dto.startedAt) rental.startedAt = new Date(dto.startedAt);
        if (dto.endedAt) rental.endedAt = new Date(dto.endedAt);

        if (rental.startedAt >= rental.endedAt) {
            throw new Error("Invalid dates: End date must be after start date");
        }

        if (dto.status && Object.values(RentalStatus).includes(dto.status)) {
            rental.status = dto.status;
        }

        await this.rentalRepository.save(rental);
        return rental;
    }

    async deleteRental(rentalId: number) {
        const rental = await this.rentalRepository.findOneBy({ id: rentalId });
        if (!rental) throw new Error("Rental not found");

        await this.rentalRepository.remove(rental);
    }

    private async enrichRental(rental: Rental, req: Request) {
        const [tenant, property] = await Promise.all([
            userClient.getUserById(rental.tenantId, req),
            propertyClient.getPropertyById(rental.propertyId, req)
        ]);

        return {
            ...rental,
            tenant,
            property
        };
    }

    private async enrichRentals(rentals: Rental[], req: Request) {
        return Promise.all(rentals.map(r => this.enrichRental(r, req)));
    }
}

export default new RentalService();