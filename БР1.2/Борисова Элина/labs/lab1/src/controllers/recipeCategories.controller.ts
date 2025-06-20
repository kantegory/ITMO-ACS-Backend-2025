import { AppDataSource } from "../config/dataSource";
import { RecipeCategory } from "../entities/RecipeCategory";

export const createRecipeCategory = async (req, res) => {
    try {
        const recipeCategoryRepository = AppDataSource.getRepository(RecipeCategory);
        const recipeCategory = recipeCategoryRepository.create(req.body);
        const results = await recipeCategoryRepository.save(recipeCategory);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRecipeCategory = async (req, res) => {
    try {
        const { recipe_id, category_id } = req.body;
        const recipeCategoryRepository = AppDataSource.getRepository(RecipeCategory);
        const results = await recipeCategoryRepository.delete({ recipe_id, category_id });
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
