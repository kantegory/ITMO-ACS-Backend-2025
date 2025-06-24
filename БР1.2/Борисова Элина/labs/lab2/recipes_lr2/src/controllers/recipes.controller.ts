import { AppDataSource } from "../config/dataSource";
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeIngredient";
import { Ingredient } from "../entities/Ingredient";

export const createRecipe = async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipe = recipeRepository.create(req.body);
        const results = await recipeRepository.save(recipe);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipes = await recipeRepository.find({ relations: ["user", "categories", "ingredients", "comments", "likes", "steps"] });
        return res.send(recipes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipe = await recipeRepository.findOne({
            where: { id: req.params.id },
            relations: ["user", "categories", "ingredients", "comments", "likes", "steps"]
        });
        return res.send(recipe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipe = await recipeRepository.findOne({
            where: { id: req.params.id },
            relations: ["ingredients"],
        });

        if (!recipe) return res.status(404).json({ error: "Recipe not found" });

        const { title, description, difficulty, ingredients } = req.body;
        if (title) recipe.title = title;
        if (description) recipe.description = description;
        if (difficulty) recipe.difficulty = difficulty;

        if (ingredients && Array.isArray(ingredients)) {
            const ingredientRepository = AppDataSource.getRepository(RecipeIngredient); // Ссылка на таблицу связи

            for (const ingredientData of ingredients) {
                const ingredient = await AppDataSource.getRepository(Ingredient).findOne({
                    where: { id: ingredientData.id }
                });

                if (!ingredient) {
                    return res.status(404).json({ error: `Ingredient with id ${ingredientData.id} not found` });
                }

                let recipeIngredient = await ingredientRepository.findOne({
                    where: { recipe_id: req.params.id, ingredient_id: ingredientData.id },
                });

                if (recipeIngredient) {
                    recipeIngredient.quantity = ingredientData.quantity;
                    await ingredientRepository.save(recipeIngredient);
                } else {
                    recipeIngredient = ingredientRepository.create({
                        recipe_id: req.params.id,
                        ingredient_id: ingredientData.id,
                        quantity: ingredientData.quantity,
                    });
                    await ingredientRepository.save(recipeIngredient);
                }
            }
        }

        const updatedRecipe = await recipeRepository.save(recipe);

        recipe.ingredients = await AppDataSource.getRepository(RecipeIngredient)
            .createQueryBuilder("recipeIngredient")
            .innerJoin("recipe_ingredient", "ri", "ri.ingredient_id = recipeIngredient.ingredient_id")
            .where("ri.recipe_id = :recipeId", { recipeId: req.params.id })
            .getMany();

        return res.json(updatedRecipe);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



export const deleteRecipe = async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const results = await recipeRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
