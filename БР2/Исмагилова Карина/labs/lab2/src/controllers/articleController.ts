import { Response } from "express";
import AppDataSource from '../app-data-source';
import { Article } from "../entities/Article";
import { User } from "../entities/User";
import { RequestWithUser } from "../middleware/auth.middleware";

export const articleController = {
  async getAllArticles(req: RequestWithUser, res: Response): Promise<void> {
    const articles = await AppDataSource.getRepository(Article).find({
      relations: ["user", "files"],
    });
    res.json(articles);
  },

  async getArticleById(req: RequestWithUser, res: Response): Promise<void> {
    const article = await AppDataSource.getRepository(Article).findOne({
      where: { article_id: Number(req.params.id) },
      relations: ["user", "files"],
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    res.json(article);
  },

  async createArticle(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Article);
    const user = await AppDataSource.getRepository(User).findOneBy({ user_id: req.user.id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const newArticle = repo.create({
      ...req.body,
      user,
    });

    const result = await repo.save(newArticle);
    res.status(201).json(result);
  },

  async updateArticle(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Article);
    const article = await repo.findOne({
      where: { article_id: Number(req.params.id) },
      relations: ["user"],
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (article.user.user_id !== req.user.id) {
      res.status(403).json({ message: "You can only update your own articles" });
      return;
    }

    repo.merge(article, req.body);
    const result = await repo.save(article);
    res.json(result);
  },

  async deleteArticle(req: RequestWithUser, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Article);
    const article = await repo.findOne({
      where: { article_id: Number(req.params.id) },
      relations: ["user"],
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (article.user.user_id !== req.user.id) {
      res.status(403).json({ message: "You can only delete your own articles" });
      return;
    }

    const result = await repo.delete(article.article_id);
    res.json(result);
  }
};
