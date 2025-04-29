import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RecipeTag } from "../models/RecipeTag";

export class RecipeTagService {
    private repository: Repository<RecipeTag>

    constructor() {
        this.repository = AppDataSource.getRepository(RecipeTag);
    }

    getAllRecipeTags = async(): Promise<Array<RecipeTag>> => {
        return this.repository.find();
    }

    getRecipeTagById = async (id: number): Promise<RecipeTag | null> => {
        return this.repository.findOneBy({id: id});
    }

    createRecipeTag = async (data: Partial<RecipeTag>): Promise<RecipeTag> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateRecipeTag = async (id: number, data: Partial<RecipeTag>): Promise<RecipeTag | null> => {
        const entity = await this.getRecipeTagById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteRecipeTag = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}