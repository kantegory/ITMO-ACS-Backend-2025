import express from 'express';
import { BlogPostController } from '../controllers/blog-post.controller';

const router = express.Router();
const blogPostController = new BlogPostController();

router.get('/', blogPostController.getAllBlogPosts);
router.get('/:id', blogPostController.getBlogPostById);
router.post('/', blogPostController.createBlogPost);
router.put('/:id', blogPostController.updateBlogPost);
router.delete('/:id', blogPostController.deleteBlogPost);

export default router;