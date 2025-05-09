import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { User } from "../entities/User";
import { dataSource } from "../dataSource"
import { checkJwt } from "../middleware/validateJWT";

const recipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);

recipeRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const recipe = recipeRepository.create({...req.body, user});
    const results = await recipeRepository.save(recipe);
    res.send(results);
})

recipeRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const results = await recipeRepository
        .createQueryBuilder("recipe")
        .leftJoinAndSelect("recipe.ingredients", "recipeIngredient")
        .leftJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .leftJoinAndSelect("recipe.steps", "steps")
        .orderBy("steps.step_number", "ASC")
        .getMany();
    res.json(results);
})

recipeRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
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

recipeRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);
    const recipe = await recipeRepository.findOneBy({
        recipe_id: recipeId,
    });
    if (!recipe) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    if (recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe with id ${recipeId}` });
        return;
    }
    recipeRepository.merge(recipe, req.body);
    const results = await recipeRepository.save(recipe);
    res.send(results);
})

recipeRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeId = parseInt(req.params.id);

    const recipe = await recipeRepository.findOneBy({
        recipe_id: recipeId,
    });
    if (!recipe) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    if (recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe with id ${recipeId}` });
        return;
    }

    const results = await recipeRepository.delete(recipeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe with id ${recipeId} not found` });
        return;
    }
    res.send(results);
})

export default recipeRouter;

