import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Recipe } from "../models/Recipe";

export class RecipeService {
    private repository: Repository<Recipe>

    constructor() {
        this.repository = AppDataSource.getRepository(Recipe);
    }

    getAllRecipes = async(): Promise<Array<Recipe>> => {
        return this.repository.find();
    }

    getRecipeById = async (id: number): Promise<Recipe | null> => {
        return this.repository.findOneBy({id: id});
    }

    createRecipe = async (data: Partial<Recipe>): Promise<Recipe> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateRecipe = async (id: number, data: Partial<Recipe>): Promise<Recipe | null> => {
        const entity = await this.getRecipeById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteRecipe = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}