import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { SavedRecipe } from "../models/SavedRecipe";

export class SavedRecipeService {
    private repository: Repository<SavedRecipe>

    constructor() {
        this.repository = AppDataSource.getRepository(SavedRecipe);
    }

    getAllSavedRecipes = async(): Promise<Array<SavedRecipe>> => {
        return this.repository.find();
    }

    getSavedRecipeById = async (id: number): Promise<SavedRecipe | null> => {
        return this.repository.findOneBy({id: id});
    }

    createSavedRecipe = async (data: Partial<SavedRecipe>): Promise<SavedRecipe> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateSavedRecipe = async (id: number, data: Partial<SavedRecipe>): Promise<SavedRecipe | null> => {
        const entity = await this.getSavedRecipeById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteSavedRecipe = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}