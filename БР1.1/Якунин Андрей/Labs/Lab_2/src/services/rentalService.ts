import { AppDataSource } from '../config/AppDataSource';
import { RentalEntity } from '../entities/rental';

const rentalRepo = AppDataSource.getRepository(RentalEntity);

export const getAllRentals = async () => {
    return await rentalRepo.find({ relations: ['advertisement', 'renter'] });
};

export const getRentalById = async (id: number) => {
    return await rentalRepo.findOne({
        where: { id },
        relations: ['advertisement', 'renter']
    });
};

export const createRental = async (rentalData: Partial<RentalEntity>) => {
    const rental = rentalRepo.create(rentalData);
    return await rentalRepo.save(rental);
};

export const updateRental = async (id: number, updateData: Partial<RentalEntity>) => {
    await rentalRepo.update(id, updateData);
    return await rentalRepo.findOneBy({ id });
};

export const deleteRental = async (id: number) => {
    return await rentalRepo.delete(id);
};
