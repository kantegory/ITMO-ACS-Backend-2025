import AppDataSource from "../config/AppDataSource";
import  { CategoryEntity } from "../entities/category";
import EntityNotFoundError from "../errors/entity-not-found";

class CategoryService {
    private categoryRepo = AppDataSource.getRepository(CategoryEntity);

    async createCategory(data: Partial<CategoryEntity>){
        const entity  = this.categoryRepo.create(data);
        return await this.categoryRepo.save(entity);
    }

    async getAllCategories(){
        return await this.categoryRepo.find();
    }

    async getCategoryById(id:number){
        return this.categoryRepo.findOne({where:{id}});
    }

    async deleteCategory(id:number){
        return this.categoryRepo.delete(id)
    }

    async updateCategory(id:number, data: any){
        const entity = this.getCategoryById(id)
        return await this.categoryRepo.update(id, data)
    }
}

export default new CategoryService();