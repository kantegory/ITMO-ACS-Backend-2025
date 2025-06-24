import { Router } from "express";
import { Request, Response } from "express"
import { Recipe } from "../entities/Recipe";
import { dataSource } from "../dataSource"
import { SavedRecipe } from "../entities/SavedRecipe";
import { User } from "../entities/User";

const savedRecipeRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const userRepository = dataSource.getRepository(User);
const savedRecipeRepository = dataSource.getRepository(SavedRecipe);

savedRecipeRouter.post("/", async function (req: Request, res: Response) {
    const username = req.get("Authorization");
    if (!username) {
        res.status(401).json({detail: "No authorization provided"});
    }
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

savedRecipeRouter.get("/", async function (req: Request, res: Response) {
    const username = req.get("Authorization");
    if (!username) {
        res.status(401).json({detail: "No authorization provided"});
    }
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

savedRecipeRouter.delete("/:id", async function (req: Request, res: Response) {
    const recipeStepId = parseInt(req.params.id);
    const results = await savedRecipeRepository.delete(recipeStepId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Saved recipe with id ${recipeStepId} not found` });
        return;
    }
    res.send(results);
})

export default savedRecipeRouter;
