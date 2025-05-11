import { Router } from "express";
import { AppDataSource } from "../dataSource";
import { Ingredient } from "../entities/Ingredient";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredient = ingredientRepository.create(req.body);
        const results = await ingredientRepository.save(ingredient);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredients = await ingredientRepository.find();
        return res.send(ingredients);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredient = await ingredientRepository.findOneBy({ id: req.params.id });
        return res.send(ingredient);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const ingredient = await ingredientRepository.findOneBy({ id: req.params.id });
        if (!ingredient) return res.status(404).json({ error: "Ingredient not found" });

        ingredientRepository.merge(ingredient, req.body);
        const results = await ingredientRepository.save(ingredient);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ingredientRepository = AppDataSource.getRepository(Ingredient);
        const results = await ingredientRepository.delete(req.params.id);
        return res.send(results);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;