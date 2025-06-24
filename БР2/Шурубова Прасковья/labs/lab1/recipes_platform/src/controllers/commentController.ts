import { Request, Response } from "express";
import AppDataSource from "../app-data-source";
import { Comment } from "../entities/Comment";
import { User } from "../entities/User";
import { Recipe } from "../entities/Recipe";

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

  async createComment(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Comment);
    const user = await AppDataSource.getRepository(User).findOneBy({ user_id: req.body.user_id });
    const recipe = await AppDataSource.getRepository(Recipe).findOneBy({ recipe_id: req.body.recipe_id });

    if (!user || !recipe) {
      res.status(404).json({ message: "User or Recipe not found" });
      return;
    }

    const newComment = repo.create({
      ...req.body,
      user,
      recipe,
    });

    const result = await repo.save(newComment);
    res.status(201).json(result);
  },

  async updateComment(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Comment);
    const comment = await repo.findOneBy({ comment_id: Number(req.params.id) });

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    repo.merge(comment, req.body);
    const result = await repo.save(comment);
    res.json(result);
  },

  async deleteComment(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Comment).delete({
      comment_id: Number(req.params.id),
    });
    res.json(result);
  },
};
