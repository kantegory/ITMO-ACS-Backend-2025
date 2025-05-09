import { Router } from "express";
import { Request, Response } from "express"
import { Ingredient } from "../entities/Ingredient";
import { dataSource } from "../dataSource"

const ingredientRouter = Router();
const ingredientRepository = dataSource.getRepository(Ingredient);

ingredientRouter.post("/", async function (req: Request, res: Response) {
    const ingredient = ingredientRepository.create(req.body);
    const results = await ingredientRepository.save(ingredient);
    res.send(results);
})

ingredientRouter.get("/", async function (req: Request, res: Response) {
    const ingredients = await ingredientRepository.find();
    res.json(ingredients);
})

ingredientRouter.get("/:id", async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const results = await ingredientRepository.findOneBy({
        ingredient_id: ingredientId,
    });
    if (!results) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    res.send(results);
})

ingredientRouter.put("/:id", async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const ingredient = await ingredientRepository.findOneBy({
        ingredient_id: ingredientId,
    });
    if (!ingredient) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    ingredientRepository.merge(ingredient, req.body);
    const results = await ingredientRepository.save(ingredient);
    res.send(results);
})

ingredientRouter.delete("/:id", async function (req: Request, res: Response) {
    const ingredientId = parseInt(req.params.id);
    const results = await ingredientRepository.delete(ingredientId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Ingredient with id ${ingredientId} not found` });
        return;
    }
    res.send(results);
})

export default ingredientRouter;
