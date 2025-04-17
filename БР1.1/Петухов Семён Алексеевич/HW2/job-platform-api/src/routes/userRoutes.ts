import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail  } from '../controllers/userController';

const router = express.Router();

// Роуты для пользователей
router.post('/users', createUser); // создание пользователя
router.get('/users', getUsers); // получение всех пользователей
router.get('/users/:id', getUserById); // получение пользователя по ID
router.get('/users/email/search', getUserByEmail); // получение пользователя по email
router.put('/users/:id', updateUser); // обновление пользователя
router.delete('/users/:id', deleteUser); // удаление пользователя

export default router;