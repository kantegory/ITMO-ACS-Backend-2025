import { AppDataSource } from "../config/dataSource";
import { RecipeStep } from "../entities/RecipeStep";

export const createRecipeStep = async (req, res) => {
    try {
        const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
        const recipeStep = recipeStepRepository.create(req.body);
        const results = await recipeStepRepository.save(recipeStep);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getStepsByRecipe = async (req, res) => {
    try {
        const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
        const steps = await recipeStepRepository.find({
            where: { recipe: { id: req.params.recipeId } },
            order: { step_number: "ASC" }
        });
        return res.send(steps);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateRecipeStep = async (req, res) => {
    try {
        const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
        const step = await recipeStepRepository.findOneBy({ id: req.params.id });
        if (!step) return res.status(404).json({ error: "Step not found" });

        recipeStepRepository.merge(step, req.body);
        const results = await recipeStepRepository.save(step);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteRecipeStep = async (req, res) => {
    try {
        const recipeStepRepository = AppDataSource.getRepository(RecipeStep);
        const results = await recipeStepRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
