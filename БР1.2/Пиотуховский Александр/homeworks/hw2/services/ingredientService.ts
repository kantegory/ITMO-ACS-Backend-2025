import { AppDataSource } from '../config/data-source';
import { Ingredient } from '../models/Ingredient';
import { CreateIngredientDTO, UpdateIngredientDTO } from '../dtos/ingredient.dto';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

export async function getAllIngredients(): Promise<Ingredient[]> {
    return ingredientRepo.find();
}

export async function getIngredientById(id: number): Promise<Ingredient | null> {
    return ingredientRepo.findOne({ where: { id } });
}

export async function createIngredient(
    data: CreateIngredientDTO
): Promise<Ingredient> {
    const existing = await ingredientRepo.findOne({ where: { name: data.name } });
    if (existing) {
        throw new Error('Ingredient already exists');
    }
    const ing = ingredientRepo.create({ name: data.name });
    return ingredientRepo.save(ing);
}

export async function updateIngredient(
    id: number,
    updates: UpdateIngredientDTO
): Promise<Ingredient | null> {
    const ing = await ingredientRepo.findOne({ where: { id } });
    if (!ing) return null;
    if (updates.name !== undefined) ing.name = updates.name;
    return ingredientRepo.save(ing);
}

export async function deleteIngredient(id: number): Promise<boolean> {
    const res = await ingredientRepo.delete(id);
    return (res.affected ?? 0) > 0;
}