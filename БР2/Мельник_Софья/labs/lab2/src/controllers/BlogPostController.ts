import { Request, Response } from 'express';
import { AppDataSource } from '../config/app-data-source';
import { BlogPost } from '../entities/BlogPost';

const blogPostRepository = AppDataSource.getRepository(BlogPost);

export const getBlogPosts = async (req: Request, res: Response) => {
  const posts = await blogPostRepository.find();
  res.json(posts);
};

export const getBlogPostById = async (req: Request, res: Response)  => {
  const { id } = req.params;
  const post = await blogPostRepository.findOneBy({ id: Number(id) });

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.json(post);
};

export const createBlogPost = async (req: Request, res: Response) => {
  const newPost = blogPostRepository.create(req.body);
  const result = await blogPostRepository.save(newPost);
  res.status(201).json(result);
};

export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await blogPostRepository.update(id, req.body);
  res.json({ message: 'Blog post updated' });
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  await blogPostRepository.delete(id);
  res.json({ message: 'Blog post deleted' });
};
