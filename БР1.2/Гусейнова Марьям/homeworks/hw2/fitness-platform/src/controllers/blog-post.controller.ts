import { Request, Response } from 'express';
import { BlogPostService } from '../services/blog-post.service';

const blogPostService = new BlogPostService();

export class BlogPostController {
  async getAllBlogPosts(req: Request, res: Response): Promise<void> {
    try {
      const blogPosts = await blogPostService.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  }

  async getBlogPostById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const blogPost = await blogPostService.getBlogPostById(id);
      if (blogPost) {
        res.json(blogPost);
      } else {
        res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  }

  async createBlogPost(req: Request, res: Response): Promise<void> {
    try {
      const newBlogPost = await blogPostService.createBlogPost(req.body);
      res.status(201).json(newBlogPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  }

  async updateBlogPost(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const updatedBlogPost = await blogPostService.updateBlogPost(id, req.body);
      if (updatedBlogPost) {
        res.json(updatedBlogPost);
      } else {
        res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  }

  async deleteBlogPost(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    try {
      const success = await blogPostService.deleteBlogPost(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Blog post not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  }
}