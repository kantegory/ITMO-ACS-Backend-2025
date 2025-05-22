import { Router } from 'express';
import { BlogPostController } from '../controllers/blog-post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const blogPostController = new BlogPostController();


router.get('/', authMiddleware, blogPostController.getAllBlogPosts);
router.get('/:id', authMiddleware, blogPostController.getBlogPostById);
router.post('/', authMiddleware, blogPostController.createBlogPost);
router.put('/:id', authMiddleware, blogPostController.updateBlogPost);
router.delete('/:id', authMiddleware, blogPostController.deleteBlogPost);

export default router;