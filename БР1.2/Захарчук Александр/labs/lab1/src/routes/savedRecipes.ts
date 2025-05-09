import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource"
import { SavedRecipe } from "../entities/SavedRecipe";
import { User } from "../entities/User";
import { checkJwt } from "../middleware/validateJWT";

const savedRecipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const savedRecipeRepository = dataSource.getRepository(SavedRecipe);

savedRecipeRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const { recipeId } = req.body;
    const recipe = await recipeRepository.findOneBy({recipe_id: recipeId});
    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
    }
    const savedRecipe = savedRecipeRepository.create({user, recipe});
    const results = await savedRecipeRepository.save(savedRecipe);
    res.send(results);
})

savedRecipeRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const username = res.locals.jwtPayload.username;
    const user = await userRepository.findOneBy({username})

    if (!user) {
        res.status(404).json({detail: `User with username ${username} not found`});
        return;
    }

    const queryBuilder = savedRecipeRepository.createQueryBuilder("saved_recipe");
    const savedRecipes = await queryBuilder
        .leftJoinAndSelect("saved_recipe.recipe", "recipe")
        .leftJoin("saved_recipe.user", "user")
        .where("user.username = :username", {username: user.username})
        .getMany();
    res.json(savedRecipes);
})

savedRecipeRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const savedRecipeId = parseInt(req.params.id);

    const savedRecipe = await savedRecipeRepository.findOneBy({saved_recipe_id: savedRecipeId});
    if (!savedRecipe) {
        res.status(404).json({detail: `Saved recipe with id ${savedRecipeId} not found`});
        return;
    }
    if (savedRecipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({detail: `You can not delete saved recipe with id ${savedRecipeId}`});
        return;
    }

    const results = await savedRecipeRepository.delete(savedRecipeId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Saved recipe with id ${savedRecipeId} not found` });
        return;
    }
    res.send(results);
})

export default savedRecipeRouter;
