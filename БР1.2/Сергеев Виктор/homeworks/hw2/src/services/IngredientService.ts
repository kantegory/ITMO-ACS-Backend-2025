import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Ingredient } from "../models/Ingredient";

export class IngredientService {
    private repository: Repository<Ingredient>

    constructor() {
        this.repository = AppDataSource.getRepository(Ingredient);
    }

    getAllIngredients = async(): Promise<Array<Ingredient>> => {
        return this.repository.find();
    }

    getIngredientById = async (id: number): Promise<Ingredient | null> => {
        return this.repository.findOneBy({id: id});
    }

    createIngredient = async (data: Partial<Ingredient>): Promise<Ingredient> => {
        const Ingredient = this.repository.create(data);
        return this.repository.save(Ingredient);
    }

    updateIngredient = async (id: number, data: Partial<Ingredient>): Promise<Ingredient | null> => {
        const Ingredient = await this.getIngredientById(id);
        if (!Ingredient) {
            return null;
        }
        this.repository.merge(Ingredient, data);
        return this.repository.save(Ingredient);
    }

    deleteIngredient = async (id: number): Promise<boolean> => {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}