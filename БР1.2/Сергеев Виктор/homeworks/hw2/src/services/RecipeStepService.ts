import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RecipeStep } from "../models/RecipeStep";

export class RecipeStepService {
    private repository: Repository<RecipeStep>

    constructor() {
        this.repository = AppDataSource.getRepository(RecipeStep);
    }

    getAllRecipeSteps = async(): Promise<Array<RecipeStep>> => {
        return this.repository.find();
    }

    getRecipeStepById = async (id: number): Promise<RecipeStep | null> => {
        return this.repository.findOneBy({id: id});
    }

    createRecipeStep = async (data: Partial<RecipeStep>): Promise<RecipeStep> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    updateRecipeStep = async (id: number, data: Partial<RecipeStep>): Promise<RecipeStep | null> => {
        const entity = await this.getRecipeStepById(id);
        if (!entity) {
            return null;
        }
        this.repository.merge(entity, data);
        return this.repository.save(entity);
    }

    deleteRecipeStep = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}