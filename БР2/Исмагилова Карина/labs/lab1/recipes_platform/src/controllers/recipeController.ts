import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Recipe } from "../entities/Recipe";

export const recipeController = {
  async getAllRecipes(req: Request, res: Response): Promise<void> {
    const recipes = await AppDataSource.getRepository(Recipe).find({
      relations: ["user", "files", "categories", "comments", "favourites", "ratings", "collections"],
    });
    res.json(recipes);
  },

  async getRecipeById(req: Request, res: Response): Promise<void> {
    const recipe = await AppDataSource.getRepository(Recipe).findOne({
      where: { recipe_id: Number(req.params.id) },
      relations: ["user", "files", "categories", "comments", "favourites", "ratings", "collections"],
    });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    res.json(recipe);
  },

  async createRecipe(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Recipe);
    const newRecipe = repo.create(req.body);
    const result = await repo.save(newRecipe);
    res.status(201).json(result);
  },

  async updateRecipe(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Recipe);
    const recipe = await repo.findOneBy({ recipe_id: Number(req.params.id) });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    repo.merge(recipe, req.body);
    const result = await repo.save(recipe);
    res.json(result);
  },

  async deleteRecipe(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Recipe).delete({
      recipe_id: Number(req.params.id),
    });
    res.json(result);
  }
};
