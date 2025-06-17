import { Router } from 'express';
import { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/BlogPostController';

const blogPostRouter = Router();

blogPostRouter.get('/', getBlogPosts);
blogPostRouter.get('/:id', (req, res, next) => {
  getBlogPostById(req, res).catch(next);
});
blogPostRouter.post('/', createBlogPost);
blogPostRouter.put('/:id', updateBlogPost);
blogPostRouter.delete('/:id', deleteBlogPost);

export default blogPostRouter;