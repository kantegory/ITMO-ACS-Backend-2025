import { Request, Response } from "express";
import AppDataSource from '../app-data-source';
import { Article } from "../entities/Article";

export const articleController = {
  async getAllArticles(req: Request, res: Response): Promise<void> {
    const articles = await AppDataSource.getRepository(Article).find({
      relations: ["user", "files"],
    });
    res.json(articles);
  },

  async getArticleById(req: Request, res: Response): Promise<void> {
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

  async createArticle(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Article);
    const newArticle = repo.create(req.body);
    const result = await repo.save(newArticle);
    res.status(201).json(result);
  },

  async updateArticle(req: Request, res: Response): Promise<void> {
    const repo = AppDataSource.getRepository(Article);
    const article = await repo.findOneBy({ article_id: Number(req.params.id) });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    repo.merge(article, req.body);
    const result = await repo.save(article);
    res.json(result);
  },

  async deleteArticle(req: Request, res: Response): Promise<void> {
    const result = await AppDataSource.getRepository(Article).delete({
      article_id: Number(req.params.id),
    });
    res.json(result);
  }
};
