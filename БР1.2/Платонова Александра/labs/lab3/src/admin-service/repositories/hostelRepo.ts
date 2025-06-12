import { EntityRepository, Repository, Like } from 'typeorm';
import { Hostel } from '../models/hostel';

@EntityRepository(Hostel)
export class HostelRepository extends Repository<Hostel> {
    async createHostel(hostelData: Partial<Hostel>): Promise<Hostel> {
        const hostel = this.create(hostelData);
        return this.save(hostel);
    }

    async findWithFilters(filters: {
        name?: string;
        house_num?: number;
        building?: number;
        organizationId?: number;
    }): Promise<Hostel[]> {
        return this.find({
            where: {
                name: filters.name ? Like(`%${filters.name}%`) : undefined,
                house_num: filters.house_num,
                building: filters.building,
            },
            relations: ['address', 'rooms'],
        });
    }

    async findById(id: number): Promise<Hostel | undefined> {
        return this.findOne({
            where: { id },
            relations: ['address', 'rooms']
        });
    }

    async updateHostel(id: number, updateData: Partial<Hostel>): Promise<Hostel | undefined> {
        await this.update(id, updateData);
        return this.findOne({ where: { id } });
    }

    async deleteHostel(id: number): Promise<void> {
        await this.delete(id);
    }
}