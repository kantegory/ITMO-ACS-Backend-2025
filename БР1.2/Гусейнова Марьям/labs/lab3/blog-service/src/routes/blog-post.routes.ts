import { Router } from 'express';
import { BlogPostController } from '../controllers/blog-post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();
const blogPostController = new BlogPostController();


router.get('/', authMiddleware, asyncHandler(blogPostController.getAllBlogPosts));
router.get('/:id', authMiddleware, asyncHandler(blogPostController.getBlogPostById));
router.post('/', authMiddleware, asyncHandler(blogPostController.createBlogPost));
router.put('/:id', authMiddleware, asyncHandler(blogPostController.updateBlogPost));
router.delete('/:id', authMiddleware, asyncHandler(blogPostController.deleteBlogPost));

export default router;