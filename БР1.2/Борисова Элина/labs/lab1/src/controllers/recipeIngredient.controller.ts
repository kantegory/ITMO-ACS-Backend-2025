import { AppDataSource } from "../config/dataSource";
import { RecipeIngredient } from "../entities/RecipeIngredient";

export const createRecipeIngredient = async (req, res) => {
    try {
        const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
        const recipeIngredient = recipeIngredientRepository.create(req.body);
        const results = await recipeIngredientRepository.save(recipeIngredient);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateRecipeIngredient = async (req, res) => {
    try {
        const { recipe_id, ingredient_id, quantity } = req.body;
        const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
        const recipeIngredient = await recipeIngredientRepository.findOne({
            where: { recipe_id, ingredient_id }
        });
        if (!recipeIngredient) return res.status(404).json({ error: "Not found" });

        recipeIngredient.quantity = quantity;
        const results = await recipeIngredientRepository.save(recipeIngredient);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRecipeIngredient = async (req, res) => {
    try {
        const { recipe_id, ingredient_id } = req.body;
        const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);
        const results = await recipeIngredientRepository.delete({ recipe_id, ingredient_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
