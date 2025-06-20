import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Collection } from "../entities/Collection";

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

  async createCollection(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Collection);
    const newCollection = repo.create(req.body);
    const result = await repo.save(newCollection);
    res.status(201).json(result);
  },

  async updateCollection(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Collection);
    const collection = await repo.findOneBy({ collection_id: Number(req.params.id) });

    if (!collection) {
      res.status(404).json({ message: "Collection not found" });
      return;
    }

    repo.merge(collection, req.body);
    const result = await repo.save(collection);
    res.json(result);
  },

  async deleteCollection(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Collection).delete({
      collection_id: Number(req.params.id),
    });
    res.json(result);
  },
};
