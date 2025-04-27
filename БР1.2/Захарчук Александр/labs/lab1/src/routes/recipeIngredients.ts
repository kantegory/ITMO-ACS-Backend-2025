import { Router } from "express";
import { Request, Response } from "express"
import { Ingredient } from "../entities/Ingredient";
import { dataSource } from "../dataSource"
import { Recipe } from "../entities/Recipe";
import { RecipeIngredient } from "../entities/RecipeToIngredient";
import { checkJwt } from "../middleware/validateJWT";

const recipeIngredientRouter = Router();

const recipeRepository = dataSource.getRepository(Recipe);
const ingredientRepository = dataSource.getRepository(Ingredient);
const recipeIngredientRepository = dataSource.getRepository(RecipeIngredient);

recipeIngredientRouter.post("/", [checkJwt], async function (req: Request, res: Response) {
    const { recipeId, ingredientId, quantity, unit } = req.body;
    const recipe = await recipeRepository.findOneBy({
        recipe_id: parseInt(recipeId),
    });

    if (!recipe) {
        res.status(404).json({detail: `Recipe with id ${recipeId} not found`});
        return;
    }

    const ingredient = await ingredientRepository.findOneBy({
        ingredient_id: parseInt(ingredientId),
    });

    if (!ingredient) {
        res.status(404).json({detail: `Ingredient with id ${ingredientId} not found`});
        return;
    }

    const recipeIngredient = recipeIngredientRepository.create({
        recipe,
        ingredient,
        quantity,
        unit,
    })

    const results = await recipeIngredientRepository.save(recipeIngredient);
    res.send(results);
})

recipeIngredientRouter.get("/", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredients = await recipeIngredientRepository.find();
    res.json(recipeIngredients);
})

recipeIngredientRouter.get("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    const results = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!results) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    res.send(results);
})

recipeIngredientRouter.put("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    const recipeIngredient = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!recipeIngredient) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    if (recipeIngredient.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe ingredient with id ${recipeIngredientId}` });
        return;
    }

    const {recipeId, ingredientId, quantity, unit} = req.body;
    let payload = {};

    if (recipeId) {
        const recipe = await recipeRepository.findOneBy({
            recipe_id: parseInt(recipeId),
        });

        if (recipe) {
            payload["recipe"] = recipe;
        }
    }

    if (ingredientId) {
        const ingredient = await ingredientRepository.findOneBy({
            ingredient_id: parseInt(ingredientId),
        });

        if (ingredient) {
            payload["ingredient"] = ingredient;
        }
    }

    if (quantity) {
        payload["quantity"] = quantity;
    }

    if (unit) {
        payload["unit"] = unit;
    }

    recipeIngredientRepository.merge(recipeIngredient, payload);
    const results = await recipeIngredientRepository.save(recipeIngredient);
    res.send(results);
})

recipeIngredientRouter.delete("/:id", [checkJwt], async function (req: Request, res: Response) {
    const recipeIngredientId = parseInt(req.params.id);
    
    const recipeIngredient = await recipeIngredientRepository.findOneBy({
        id: recipeIngredientId,
    });
    if (!recipeIngredient) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    if (recipeIngredient.recipe.user.username !== res.locals.jwtPayload.username) {
        res.status(403).json({ detail: `You can not edit recipe ingredient with id ${recipeIngredientId}` });
        return;
    }

    const results = await recipeIngredientRepository.delete(recipeIngredientId);
    if (!results.affected || results.affected === 0) {
        res.status(404).json({ detail: `Recipe ingredient with id ${recipeIngredientId} not found` });
        return;
    }
    res.send(results);
})

export default recipeIngredientRouter;
