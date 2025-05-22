import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Favourite } from "../entities/Favourite";
import { RequestWithUser } from "../middleware/auth.middleware";

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

  async addFavourite(req: RequestWithUser, res: Response): Promise<void> {
    const user_id = req.user.id;

    const repo = AppDataSource.getRepository(Favourite);
    const newFavourite = repo.create({
      user: { user_id },
      recipe: req.body.recipe,
    });
    const result = await repo.save(newFavourite);
    res.status(201).json(result);
  },

  async updateFavourite(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Favourite);
    const favourite = await repo.findOneBy({ favourites_id: Number(req.params.id) });

    if (!favourite) {
      res.status(404).json({ message: "Favourite not found" });
      return;
    }

    if (favourite.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only update your own favourites" });
      return;
    }

    repo.merge(favourite, req.body);
    const result = await repo.save(favourite);
    res.json(result);
  },

  async removeFavourite(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Favourite);
    const favourite = await repo.findOneBy({ favourites_id: Number(req.params.id) });

    if (!favourite) {
      res.status(404).json({ message: "Favourite not found" });
      return;
    }

    if (favourite.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only remove your own favourites" });
      return;
    }

    const result = await repo.delete({ favourites_id: Number(req.params.id) });
    res.json(result);
  }
};
