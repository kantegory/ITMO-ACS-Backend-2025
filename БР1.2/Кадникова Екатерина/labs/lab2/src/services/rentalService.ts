import { AppDataSource } from "../data-source";
import { Rental } from "../models/rental";
import { Property } from "../models/property";
import { User } from "../models/user";
import { RentalStatus } from "../models/enums/rentalStatus";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rentalDto";

const rentalRepository = AppDataSource.getRepository(Rental);
const propertyRepository = AppDataSource.getRepository(Property);
const userRepository = AppDataSource.getRepository(User);

class RentalService {
    async getAllRentals() {
        return rentalRepository.find({
            relations: ['property', 'tenant', 'property.owner'],
            order: { started_at: 'DESC' }
        });
    }

    async getRentalById(id: number, userId?: number, isAdmin: boolean = false) {
        const rental = await rentalRepository.findOne({
            where: { id },
            relations: ['tenant', 'property', 'property.owner']
        });

        if (!rental) throw new Error("Rental not found");

        if (userId) {
            const isTenant = rental.tenant.id === userId;
            const isOwner = rental.property.owner.id === userId;

            if (!isTenant && !isOwner && !isAdmin) {
                throw new Error("Forbidden");
            }
        }

        return rental;
    }

    async getUserRentals(userId: number) {
        return rentalRepository.find({
            where: { tenant: { id: userId } },
            relations: ['property', 'tenant', 'property.owner'],
            order: { started_at: 'DESC' }
        });
    }

    async createRental(dto: CreateRentalDto, userId: number) {
        const startDate = new Date(dto.started_at);
        const endDate = new Date(dto.ended_at);

        if (startDate >= endDate) {
            throw new Error("End date must be after start date");
        }

        const property = await propertyRepository.findOneBy({ id: dto.propertyId });
        const tenant = await userRepository.findOneBy({ id: userId });

        if (!property) throw new Error("Property not found");
        if (!tenant) throw new Error("User not found");

        const conflictingRental = await rentalRepository
            .createQueryBuilder('rental')
            .where('rental.propertyId = :propertyId', { propertyId: dto.propertyId })
            .andWhere('rental.status = :status', { status: RentalStatus.ACTIVE })
            .andWhere('(rental.started_at <= :ended AND rental.ended_at >= :started)', {
                started: startDate,
                ended: endDate
            })
            .getOne();

        if (conflictingRental) {
            throw new Error("Property is already rented for selected dates");
        }

        const rental = rentalRepository.create({
            property,
            tenant,
            started_at: startDate,
            ended_at: endDate,
            status: RentalStatus.ACTIVE
        });

        await rentalRepository.save(rental);
        return this.getRentalById(rental.id, userId);
    }

    async updateRentalStatus(rentalId: number, status: string, userId: number, isAdmin: boolean) {
        if (!Object.values(RentalStatus).includes(status as RentalStatus)) {
            throw new Error("Invalid status value");
        }

        const rental = await this.getRentalById(rentalId, userId, isAdmin);
        rental.status = status as RentalStatus;

        await rentalRepository.save(rental);
        return rental;
    }

    async updateRental(rentalId: number, dto: UpdateRentalDto, userId: number, isAdmin: boolean) {
        const rental = await this.getRentalById(rentalId, userId, isAdmin);

        if (dto.started_at) rental.started_at = new Date(dto.started_at);
        if (dto.ended_at) rental.ended_at = new Date(dto.ended_at);

        if (rental.started_at >= rental.ended_at) {
            throw new Error("Invalid dates: End date must be after start date");
        }

        if (dto.status && Object.values(RentalStatus).includes(dto.status)) {
            rental.status = dto.status;
        }

        await rentalRepository.save(rental);
        return rental;
    }

    async deleteRental(rentalId: number) {
        const rental = await rentalRepository.findOneBy({ id: rentalId });
        if (!rental) throw new Error("Rental not found");

        await rentalRepository.remove(rental);
    }
}

export default new RentalService();