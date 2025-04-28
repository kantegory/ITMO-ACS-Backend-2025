import BlogPost from '../models/BlogPost';
import { Request, Response } from 'express';

export const createPost = async (req: Request, res: Response) => {
  const post = new BlogPost(req.body);
  const saved = await post.save();
  res.status(201).json(saved);
};

export const getPost = async (req: Request, res: Response) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deletePost = async (req: Request, res: Response) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const listPosts = async (_: Request, res: Response) => {
  const posts = await BlogPost.find();
  res.json(posts);
};
