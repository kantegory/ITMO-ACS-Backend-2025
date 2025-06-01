import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Favourite } from "../entities/Favourite";

export const favouriteController = {
  async getAllFavourites(req: Request, res: Response): Promise<void> {
    const favourites = await AppDataSource.getRepository(Favourite).find({
      where: { user: { user_id: Number(req.params.userId) } },
      relations: ["user", "recipe"],
    });
    res.json(favourites);
  },

  async getFavouriteById(req: Request, res: Response): Promise<void> {
    const favourite = await AppDataSource.getRepository(Favourite).findOne({
      where: { favourites_id: Number(req.params.id) },
      relations: ["user", "recipe"],
    });

    if (!favourite) {
      res.status(404).json({ message: "Favourite not found" });
      return;
    }

    res.json(favourite);
  },

  async addFavourite(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Favourite);
    const newFavourite = repo.create({
      user: req.body.user,
      recipe: req.body.recipe,
    });
    const result = await repo.save(newFavourite);
    res.status(201).json(result);
  },

  async updateFavourite(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Favourite);
    const favourite = await repo.findOneBy({ favourites_id: Number(req.params.id) });

    if (!favourite) {
      res.status(404).json({ message: "Favourites not found" });
      return;
    }

    repo.merge(favourite, req.body);
    const result = await repo.save(favourite);
    res.json(result);
  },

  async removeFavourite(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Favourite).delete({
      favourites_id: Number(req.params.id),
    });
    res.json(result);
  }
};
