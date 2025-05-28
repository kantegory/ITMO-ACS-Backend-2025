import dataSource from '../config/data-source';
import { RentalEntity } from '../models/rental.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class RentalService {
    private repository = dataSource.getRepository(RentalEntity);

    async getById(id: number) {
        const rental = await this.repository.findOne({
            where: { id },
            relations: ['user', 'advertisement'],
        });
        if (!rental) throw new EntityNotFoundError(RentalEntity, id, "id");
        return rental;
    }

    async getAll() {
        return await this.repository.find({
            relations: ['user', 'advertisement'],
        });
    }

    async create(data: Partial<RentalEntity>) {
        const rental = this.repository.create(data);
        return await this.repository.save(rental);
    }

    async update(id: number, data: Partial<RentalEntity>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new RentalService();
