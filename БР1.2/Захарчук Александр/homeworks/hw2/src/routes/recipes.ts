import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { User } from "../entities/User";
import { dataSource } from "../dataSource"

const recipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);

recipeRouter.post("/", async function (req: Request, res: Response) {
    const username = req.get("Authorization");
    if (!username) {
        res.status(401).json({detail: "No authorization provided"});
    }
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const recipe = recipeRepository.create({...req.body, user});
    const results = await recipeRepository.save(recipe);
    res.send(results);
})

recipeRouter.get("/", async function (req: Request, res: Response) {
    const results = await recipeRepository
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "recipeIngredient")
        .leftJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .leftJoinAndSelect("recipe.steps", "steps")
        .orderBy("steps.step_number", "ASC")
        .getMany();
    res.json(results);
})

recipeRouter.get("/:id", async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const results = await recipeRepository
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "recipeIngredient")
        .leftJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .leftJoinAndSelect("recipe.steps", "steps")
        .where("recipe.recipe_id = :recipeId", { recipeId })
        .orderBy("steps.step_number", "ASC")
        .getOne();
    if (!results) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    res.send(results);
})

recipeRouter.put("/:id", async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const recipe = await recipeRepository.findOneBy({
        recipe_id: recipeId,
    });
    if (!recipe) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    recipeRepository.merge(recipe, req.body);
    const results = await recipeRepository.save(recipe);
    res.send(results);
})

recipeRouter.delete("/:id", async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const results = await recipeRepository.delete(recipeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    res.send(results);
})

export default recipeRouter;

