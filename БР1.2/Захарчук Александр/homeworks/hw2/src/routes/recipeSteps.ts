import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource"
import { RecipeStep } from "../entities/RecipeStep";

const recipeStepRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const recipeStepRepository = dataSource.getRepository(RecipeStep);

recipeStepRouter.post("/", async function (req: Request, res: Response) {
    const { recipeId } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const recipeStep = recipeStepRepository.create({...req.body, recipe});
    const results = await recipeStepRepository.save(recipeStep);
    res.send(results);
})

recipeStepRouter.get("/:id", async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const results = await recipeStepRepository.findOneBy({
        recipe_step_id: recipeStepId,
    });
    if (!results) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    res.send(results);
})

recipeStepRouter.put("/:id", async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const recipeStep = await recipeStepRepository.findOneBy({
        recipe_step_id: recipeStepId,
    });
    if (!recipeStep) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    const {recipeId} = req.body;
    if (recipeId) {
        const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
        if (recipe) {
            req.body["recipe"] = recipe;
        }
    }

    recipeStepRepository.merge(recipeStep, req.body);
    const results = await recipeStepRepository.save(recipeStep);
    res.send(results);
})

recipeStepRouter.delete("/:id", async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const results = await recipeStepRepository.delete(recipeStepId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe step with id ${recipeStepId} not found` });
        return;
    }
    res.send(results);
})

export default recipeStepRouter;
