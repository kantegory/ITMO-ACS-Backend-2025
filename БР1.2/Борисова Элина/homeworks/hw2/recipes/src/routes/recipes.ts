import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { Recipe } from "../entities/Recipe";

const router = Router();

// CRUD operations for Recipe
router.post("/", async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipe = recipeRepository.create(req.body);
        const results = await recipeRepository.save(recipe);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipes = await recipeRepository.find({ relations: ["user", "categories", "ingredients", "comments", "likes", "steps"] });
        return res.send(recipes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const recipe = await recipeRepository.findOneBy({ id: req.params.id });
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });

        recipeRepository.merge(recipe, req.body);
        const results = await recipeRepository.save(recipe);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const recipeRepository = AppDataSource.getRepository(Recipe);
        const results = await recipeRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;