import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Rating } from "../entities/Rating";
import { RequestWithUser } from "../middleware/auth.middleware";

export const ratingController = {
  async getAllRatings(req: Request, res: Response): Promise<void> {
    const ratings = await AppDataSource.getRepository(Rating).find({
      relations: ["user", "recipe"],
    });
    res.json(ratings);
  },

  async getRatingById(req: Request, res: Response): Promise<void> {
    const rating = await AppDataSource.getRepository(Rating).findOne({
      where: { rating_id: Number(req.params.id) },
      relations: ["user", "recipe"],
    });

    if (!rating) {
      res.status(404).json({ message: "Rating not found" });
      return;
    }

    res.json(rating);
  },

  async createRating(req: RequestWithUser, res: Response): Promise<void> {
    const user_id = req.user.id;
    const repo = AppDataSource.getRepository(Rating);
    const newRating = repo.create({ ...req.body, user: { user_id } });
    const result = await repo.save(newRating);
    res.status(201).json(result);
  },

  async updateRating(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Rating);
    const rating = await repo.findOneBy({ rating_id: Number(req.params.id) });

    if (!rating) {
      res.status(404).json({ message: "Rating not found" });
      return;
    }

    if (rating.user.user_id !== req.user.id) {
      res.status(403).json({ message: "you can only update your own ratings" });
      return;
    }

    repo.merge(rating, req.body);
    const result = await repo.save(rating);
    res.json(result);
  },

  async deleteRating(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Rating);
    const rating = await repo.findOneBy({ rating_id: Number(req.params.id) });

    if (!rating) {
      res.status(404).json({ message: "Rating not found" });
      return;
    }

    if (rating.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only delete your own ratings" });
      return;
    }

    const result = await repo.delete({ rating_id: Number(req.params.id) });
    res.json(result);
  }
};
