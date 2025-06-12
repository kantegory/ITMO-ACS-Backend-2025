import { EntityRepository, Repository } from 'typeorm';
import { Resident } from '../models/resident';

@EntityRepository(Resident)
export class ResidentRepository extends Repository<Resident> {
    async findById(residentId: number): Promise<Resident | undefined> {
        return this.findOne({
            where: { id: residentId },
            relations: ['checkIns'],
        });
    }

    async updateProfile(residentId: number, data: { phone?: string, email?: string }): Promise<void> {
        await this.update(residentId, data);
    }
}