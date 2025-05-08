import express from 'express';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  listPosts
} from '../controllers/blogPostController';

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/posts', listPosts);

export default router;
