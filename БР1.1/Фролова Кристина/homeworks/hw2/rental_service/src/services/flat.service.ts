import dataSource from '../config/data-source';
import { FlatEntity } from '../models/flat.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class FlatService {
    private repository = dataSource.getRepository(FlatEntity);

    async getById(id: number) {
        const flat = await this.repository.findOneBy({ id });
        if (!flat) throw new EntityNotFoundError(FlatEntity, id, "id");
        return flat;
    }

    async create(data: Partial<FlatEntity>) {
        const flat = this.repository.create(data);
        return this.repository.save(flat);
    }

    async update(id: number, data: Partial<FlatEntity>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new FlatService();
