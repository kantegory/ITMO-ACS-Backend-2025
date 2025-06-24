import dataSource from '../config/data-source';
import { PropertyEntity } from '../models/property.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class PropertyService {
    private repository = dataSource.getRepository(PropertyEntity);

    async getById(id: number) {
        const property = await this.repository.findOne({
            where: { id },
            relations: ['living'], // опционально, если нужна вложенность
        });

        if (!property) throw new EntityNotFoundError(PropertyEntity, id, "id");
        return property;
    }

    async getAll() {
        return await this.repository.find({
            relations: ['living'], // опционально
        });
    }

    async create(data: Partial<PropertyEntity>) {
        const property = this.repository.create(data);
        return await this.repository.save(property);
    }

    async update(id: number, data: Partial<PropertyEntity>) {
        await this.getById(id);
        await this.repository.update(id, data);
        return this.getById(id);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new PropertyService();
