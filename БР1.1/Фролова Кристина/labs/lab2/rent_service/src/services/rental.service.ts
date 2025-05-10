import dataSource from '../config/data-source';
import EntityNotFoundError from '../errors/entity-not-found.error';
import {RentalEntity} from "../entities/rental.entity";
import {Rental} from "../models/models/rental.model";
import {toRental} from "../mappers/rental.mapper";
import {CreateRentalModel} from "../models/requests/rental/rental-create.model";
import {UpdateRentalData} from "../models/requests/rental/rental-update.model";

class RentalService {
    private repository = dataSource.getRepository(RentalEntity);

    async getById(id: number): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { id },
            relations: ['rental', 'advertisement'],
        });
        if (!rental) throw new EntityNotFoundError(RentalEntity, id, "id");
        return toRental(rental);
    }

    async getAll(): Promise<Rental[]>    {
        const rentals = await this.repository.find({
            relations: ['renter', 'advertisement'],
        });
        return rentals.map(toRental);
    }

    async getRentalsByRenterId(renterId: number): Promise<Rental[]> {
        const rentals =  await this.repository.find({
            where: { renter: { id: renterId } },
            relations: ['renter', 'advertisement'],
        });
        return rentals.map(toRental)
    }

    async getRentalsByAdvertisementId(advertisementId: number): Promise<Rental[]> {
        const rentals =  await this.repository.find({
            where: { advertisement: { id: advertisementId } },
            relations: ['renter', 'advertisement'],
        });
        return rentals.map(toRental)
    }

    async getRentalsByOwnerId(ownerId: number): Promise<Rental[]> {
        const rentals =  await this.repository.find({
            where: { advertisement: { owner: { id: ownerId } } },
            relations: ['renter', 'advertisement'],
        });
        return rentals.map(toRental)
    }

    async create(data: CreateRentalModel): Promise<Rental> {
        const rentalEntity = this.repository.create(data);
        const savedRental = await this.repository.save(rentalEntity)
        return toRental(savedRental);
    }

    async update(id: number, data: UpdateRentalData): Promise<Rental> {
        const rental = await this.getById(id);
        Object.assign(rental, data)
        const updatedRental = await this.repository.save(rental);
        return toRental(updatedRental);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new RentalService();
