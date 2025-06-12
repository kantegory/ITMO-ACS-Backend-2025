import { EntityRepository, Repository, Like } from 'typeorm';
import { Address } from '../models/address';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {
    async createAddress(addressData: Partial<Address>): Promise<Address> {
        const address = this.create(addressData);
        return this.save(address);
    }

    async findWithFilters(filters: {
        city_district?: string;
        street?: string;
        zip_code?: string;
    }): Promise<Address[]> {
        return this.find({
            where: {
                city_district: filters.city_district ? Like(`%${filters.city_district}%`) : undefined,
                street: filters.street ? Like(`%${filters.street}%`) : undefined,
                zip_code: filters.zip_code ? Like(`%${filters.zip_code}%`) : undefined,
            },
            relations: ['hostel'],
        });
    }

    async findById(id: number): Promise<Address | undefined> {
        return this.findOne({ where: { id }, relations: ['hostel'] });
    }

    async updateAddress(id: number, updateData: Partial<Address>): Promise<Address | undefined> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deleteAddress(id: number): Promise<void> {
        await this.delete(id);
    }
}