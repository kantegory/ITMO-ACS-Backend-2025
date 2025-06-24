import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RecipeIngredient } from "../models/RecipeIngredient";

export class RecipeIngredientService {
    private repository: Repository<RecipeIngredient>

    constructor() {
        this.repository = AppDataSource.getRepository(RecipeIngredient);
    }

    getAllRecipeIngredients = async(): Promise<Array<RecipeIngredient>> => {
        return this.repository.find();
    }

    getRecipeIngredientById = async (id: number): Promise<RecipeIngredient | null> => {
        return this.repository.findOneBy({id: id});
    }

    createRecipeIngredient = async (data: Partial<RecipeIngredient>): Promise<RecipeIngredient> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateRecipeIngredient = async (id: number, data: Partial<RecipeIngredient>): Promise<RecipeIngredient | null> => {
        const entity = await this.getRecipeIngredientById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteRecipeIngredient = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}