import express from 'express';
import { createUser, getUserByIdOrEmail } from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUserByIdOrEmail); // /users?id=xxx или /users?email=yyy

export default router;
