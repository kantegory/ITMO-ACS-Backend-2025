import { Request, Response } from "express";
import { postLikeRepository } from "../repositories/postLike.repository";

export const PostLikeController = {
  create: async (req: Request, res: Response) => {
    const like = await postLikeRepository.save(req.body);
    res.json(like);
  },

  getAll: async (_: Request, res: Response) => {
    const likes = await postLikeRepository.find();
    res.json(likes);
  },

  getById: async (req: Request, res: Response) => {
    const like = await postLikeRepository.findOneBy({ like_id: +req.params.id });
    if (!like) return res.status(404).json({ message: "Like not found" });
    res.json(like);
  },

  update: async (req: Request, res: Response) => {
    await postLikeRepository.update(req.params.id, req.body);
    res.json({ message: "Like updated" });
  },

  delete: async (req: Request, res: Response) => {
    await postLikeRepository.delete(req.params.id);
    res.json({ message: "Like deleted" });
  }
};
