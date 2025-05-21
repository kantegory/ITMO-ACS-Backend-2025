// services/category.service.ts
import dataSource from '../config/data-source';
import { CategoryEntity } from '../models/category.entity';
import EntityNotFoundError from '../errors/entity-not-found.error';

class CategoryService {
    private repository = dataSource.getRepository(CategoryEntity);

    async getAll() {
        return this.repository.find();
    }

    async getById(id: number) {
        const category = await this.repository.findOneBy({ id });
        if (!category) {
            throw new EntityNotFoundError(CategoryEntity, id, "id");
        }
        return category;
    }

    async create(data: CategoryEntity) {
        const category = this.repository.create(data);
        return this.repository.save(category);
    }

    async update(id: number, data: CategoryEntity) {
        await this.getById(id);
        return this.repository.update(id, data);
    }

    async delete(id: number) {
        await this.getById(id);
        return this.repository.delete(id);
    }
}

export default new CategoryService();
