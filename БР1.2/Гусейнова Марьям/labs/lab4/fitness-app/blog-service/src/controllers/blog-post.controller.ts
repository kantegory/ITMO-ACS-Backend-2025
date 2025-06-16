import { Request, Response } from 'express';
import { BlogPostService } from '../services/blog-post.service';
import { CustomError } from '../utils/custom-error.util';

const blogPostService = new BlogPostService();

export class BlogPostController {
  getAllBlogPosts = async (req: Request, res: Response) => {
    const blogPosts = await blogPostService.getAllBlogPosts();
    res.json(blogPosts);
  };

  getBlogPostById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid blog post ID format', 400);
    }
    const blogPost = await blogPostService.getBlogPostById(id);
    res.json(blogPost);
  };

  createBlogPost = async (req: Request, res: Response) => {
    const newBlogPost = await blogPostService.createBlogPost(req.body);
    res.status(201).json(newBlogPost);
  };

  updateBlogPost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid blog post ID format', 400);
    }
    const updatedBlogPost = await blogPostService.updateBlogPost(id, req.body);
    res.json(updatedBlogPost);
  };

  deleteBlogPost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      throw new CustomError('Invalid blog post ID format', 400);
    }
    await blogPostService.deleteBlogPost(id);
    res.status(204).send();
  };
}