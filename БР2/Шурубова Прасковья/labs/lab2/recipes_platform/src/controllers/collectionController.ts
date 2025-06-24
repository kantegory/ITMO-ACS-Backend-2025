import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Collection } from "../entities/Collection";
import { RequestWithUser } from "../middleware/auth.middleware";
import {Recipe} from "../entities/Recipe";
import {In} from "typeorm";

export const collectionController = {
  async getAllCollections(req: Request, res: Response): Promise<void> {
    const collections = await AppDataSource.getRepository(Collection).find({
      relations: ["user", "recipes"],
    });
    res.json(collections);
  },

  async getCollectionById(req: Request, res: Response): Promise<void> {
    const collection = await AppDataSource.getRepository(Collection).findOne({
      where: { collection_id: Number(req.params.id) },
      relations: ["user", "recipes"],
    });

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    res.json(collection);
  },

  async createCollection(req: RequestWithUser, res: Response): Promise<void> {
    const user_id = req.user.id;
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const recipeIds = req.body.recipes?.map((r: { recipe_id: number }) => r.recipe_id) || [];

    const recipes = await recipeRepo.findBy({ recipe_id: In(recipeIds) });

    const newCollection = AppDataSource.getRepository(Collection).create({
      collection_name: req.body.collection_name,
      recipes,
      user: { user_id },
    });

    const result = await AppDataSource.getRepository(Collection).save(newCollection);
    res.status(201).json(result);
  },

  async updateCollection(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Collection);
    const collection = await repo.findOneBy({ collection_id: Number(req.params.id) });

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    if (collection.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only update your own collections" });
      return;
    }

    repo.merge(collection, req.body);
    const result = await repo.save(collection);
    res.json(result);
  },

  async deleteCollection(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Collection);
    const collection = await repo.findOneBy({ collection_id: Number(req.params.id) });

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    if (collection.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only delete your own collections" });
      return;
    }

    const result = await repo.delete({ collection_id: Number(req.params.id) });
    res.json(result);
  },
};
