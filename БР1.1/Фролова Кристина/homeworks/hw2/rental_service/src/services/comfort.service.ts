import dataSource from '../config/data-source';
import { ComfortEntity } from '../models/comfort.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class ComfortService {
    private repository = dataSource.getRepository(ComfortEntity);

    async getById(id: number) {
        const comfort = await this.repository.findOneBy({ id });
        if (!comfort) throw new EntityNotFoundError(ComfortEntity, id, "id");
        return comfort;
    }

    async create(data: Partial<ComfortEntity>) {
        const comfort = this.repository.create(data);
        return this.repository.save(comfort);
    }

    async update(id: number, data: Partial<ComfortEntity>) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new ComfortService();
