import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Recipe } from "../entities/Recipe";
import { RequestWithUser } from "../middleware/auth.middleware";

export const commentController = {
  async getAllComments(req: Request, res: Response): Promise<void> {
    const comments = await AppDataSource.getRepository(Comment).find({
      relations: ["user", "recipe"],
    });
    res.json(comments);
  },

  async getCommentById(req: Request, res: Response): Promise<void> {
    const comment = await AppDataSource.getRepository(Comment).findOne({
      where: { comment_id: Number(req.params.id) },
      relations: ["user", "recipe"],
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    res.json(comment);
  },

  async createComment(req: RequestWithUser, res: Response): Promise<void> {
    const user_id = req.user.id;
    const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ recipe_id: req.body.recipe_id });

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    const newComment = AppDataSource.getRepository(Comment).create({
      ...req.body,
      user: { user_id },
      recipe,
    });

    const result = await AppDataSource.getRepository(Comment).save(newComment);
    res.status(201).json(result);
  },

  async updateComment(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Comment);
    const comment = await repo.findOneBy({ comment_id: Number(req.params.id) });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (comment.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only update your own comments" });
      return;
    }

    repo.merge(comment, req.body);
    const result = await repo.save(comment);
    res.json(result);
  },

  async deleteComment(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Comment);

    const comment = await repo.findOne({
      where: { comment_id: Number(req.params.id) },
      relations: ["user"]
    });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (!comment.user) {
      res.status(400).json({ message: "Comment does not have an associated user" });
      return;
    }

    if (comment.user.user_id !== req.user.id) {
      res.status(403).json({ message: "Forbidden: you can only delete your own comments" });
      return;
    }

    const result = await repo.delete({ comment_id: Number(req.params.id) });
    res.json(result);
  },
};
