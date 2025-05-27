import express from 'express';
import {checkAuth} from "../middleware/checkAuth";
import blogPostController from "../controllers/blogPostController";

const router = express.Router();

router.get('/get-all', blogPostController.getAll)
router.get('/get-one/:id', blogPostController.getOne)
router.post('/', checkAuth, blogPostController.create)
router.put('/:id', checkAuth, blogPostController.update)
router.delete('/:id', checkAuth, blogPostController.delete)

export default router;