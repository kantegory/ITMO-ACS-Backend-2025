import { Router } from 'express';
import * as postController from '../controllers/postController';

const router = Router();

router.get('/', postController.listPostsController);
router.get('/:id', postController.getPostController);
router.post('/', postController.createPostController);
router.put('/:id', postController.updatePostController);
router.delete('/:id', postController.deletePostController);

router.post('/:id/favorite', postController.addFavoriteController);
router.delete('/:id/favorite', postController.removeFavoriteController);

export default router;