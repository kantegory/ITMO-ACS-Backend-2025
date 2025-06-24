import { Response } from "express";
import AppDataSource from "../app-data-source";
import { Recipe } from "../entities/Recipe";
import { User } from "../entities/User";
import { RequestWithUser } from "../middleware/auth.middleware";

export const recipeController = {
  async getAllRecipes(req: RequestWithUser, res: Response): Promise<void> {
    const recipes = await AppDataSource.getRepository(Recipe).find({
      relations: ["user", "files", "categories", "comments", "favourites", "ratings", "collections"],
    });
    res.json(recipes);
  },

  async getRecipeById(req: RequestWithUser, res: Response): Promise<void> {
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

  async createRecipe(req: RequestWithUser, res: Response): Promise<void> {
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ user_id: req.user.id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newRecipe = recipeRepo.create({
      ...req.body,
      user: user,
    });

    const result = await recipeRepo.save(newRecipe);
    res.status(201).json(result);
  },

  async updateRecipe(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Recipe);
    const recipe = await repo.findOne({
      where: { recipe_id: Number(req.params.id) },
      relations: ["user"],
    });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    if (recipe.user.user_id !== req.user.id) {
      res.status(403).json({ message: "You can only update your own recipes" });
      return;
    }

    repo.merge(recipe, req.body);
    const result = await repo.save(recipe);
    res.json(result);
  },

  async deleteRecipe(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Recipe);
    const recipe = await repo.findOne({
      where: { recipe_id: Number(req.params.id) },
      relations: ["user"],
    });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    if (recipe.user.user_id !== req.user.id) {
      res.status(403).json({ message: "You can only delete your own recipes" });
      return;
    }

    const result = await repo.delete(recipe.recipe_id);
    res.json(result);
  }
};
