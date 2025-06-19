import { Request, Response } from "express";
import { blogPostRepository } from "../repositories/blogPost.repository";

export const BlogPostController = {
  create: async (req: Request, res: Response) => {
    const post = await blogPostRepository.save(req.body);
    res.json(post);
  },

  getAll: async (_: Request, res: Response) => {
    const posts = await blogPostRepository.find();
    res.json(posts);
  },

  getById: async (req: Request, res: Response) => {
    const post = await blogPostRepository.findOneBy({ post_id: +req.params.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  },

  update: async (req: Request, res: Response) => {
    await blogPostRepository.update(req.params.id, req.body);
    res.json({ message: "Post updated" });
  },

  delete: async (req: Request, res: Response) => {
    await blogPostRepository.delete(req.params.id);
    res.json({ message: "Post deleted" });
  }
};
