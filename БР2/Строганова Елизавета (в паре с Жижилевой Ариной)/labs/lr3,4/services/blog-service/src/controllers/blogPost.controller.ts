import { Request, Response } from "express";
import { blogPostRepository } from "../repositories/blogPost.repository";
import axios from "axios";
import { publishEvent } from "../rabbitmq";

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const BlogPostController = {
  create: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      const user = await verifyToken(token);
      const post = { ...req.body, user_id: user.user_id };
      const savedPost = await blogPostRepository.save(post);
      await publishEvent("new_post_created", { post_id: savedPost.post_id, user_id: user.user_id });
      res.json(savedPost);
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
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
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      await verifyToken(token);
      await blogPostRepository.update(req.params.id, req.body);
      res.json({ message: "Post updated" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
  delete: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      await verifyToken(token);
      await blogPostRepository.delete(req.params.id);
      res.json({ message: "Post deleted" });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  },
};