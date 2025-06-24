import { Request, Response } from "express";
import { postTagRepository } from "../repositories/postTag.repository";

export const PostTagController = {
  create: async (req: Request, res: Response) => {
    const tag = await postTagRepository.save(req.body);
    res.json(tag);
  },

  getAll: async (_: Request, res: Response) => {
    const tags = await postTagRepository.find();
    res.json(tags);
  },

  getById: async (req: Request, res: Response) => {
    const tag = await postTagRepository.findOneBy({ posttag_id: +req.params.id });
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.json(tag);
  },

  update: async (req: Request, res: Response) => {
    await postTagRepository.update(req.params.id, req.body);
    res.json({ message: "Tag updated" });
  },

  delete: async (req: Request, res: Response) => {
    await postTagRepository.delete(req.params.id);
    res.json({ message: "Tag deleted" });
  }
};