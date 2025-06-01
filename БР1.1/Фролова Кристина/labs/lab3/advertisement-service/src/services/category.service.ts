import dataSource from '../config/data-source';
import {CategoryEntity} from "../entities/category.entity";
import {entityToCategory} from "../mappers/category.mapper";
import {Category} from "../models/models/category.model";
import {CreateCategoryRequestModel} from "../models/requests/category/category-create-request.model";
import {EntityNotFoundError} from "@rent/shared";

class CategoryService {
    private repository = dataSource.getRepository(CategoryEntity);

    async getAll(): Promise<Category[]> {
        return this.repository.find().then(categories => categories.map(entityToCategory));
    }

    async getById(id: number): Promise<Category> {
        const category = await this.repository.findOneBy({id});
        if (!category) {
            throw new EntityNotFoundError(CategoryEntity, id, "id");
        }
        return entityToCategory(category);
    }

    async create(data: CreateCategoryRequestModel): Promise<Category> {
        const categoryEntity = this.repository.create(data);
        const savedCategory = await this.repository.save(categoryEntity);
        return entityToCategory(savedCategory);
    }

    async update(id: number, data: Category): Promise<Category> {
        const category = await this.getById(id);
        Object.assign(category, data);
        const updatedCategory = await this.repository.save(category)
        return entityToCategory(updatedCategory)
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new CategoryService();
