import { Request, Response } from "express";
import { postCommentRepository } from "../repositories/postComment.repository";

export const PostCommentController = {
  create: async (req: Request, res: Response) => {
    const comment = await postCommentRepository.save(req.body);
    res.json(comment);
  },

  getAll: async (_: Request, res: Response) => {
    const comments = await postCommentRepository.find();
    res.json(comments);
  },

  getById: async (req: Request, res: Response) => {
    const comment = await postCommentRepository.findOneBy({ comment_id: +req.params.id });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.json(comment);
  },

  update: async (req: Request, res: Response) => {
    await postCommentRepository.update(req.params.id, req.body);
    res.json({ message: "Comment updated" });
  },

  delete: async (req: Request, res: Response) => {
    await postCommentRepository.delete(req.params.id);
    res.json({ message: "Comment deleted" });
  }
};