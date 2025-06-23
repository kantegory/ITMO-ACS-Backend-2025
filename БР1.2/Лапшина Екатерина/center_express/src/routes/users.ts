/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

import { Router } from "express";
import { 
  getAllUsers, 
  getAgents, 
  getClients, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/agents:
 *   get:
 *     summary: Получить всех агентов
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список агентов
 */
router.get("/agents", getAgents);

/**
 * @swagger
 * /users/clients:
 *   get:
 *     summary: Получить всех клиентов
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список клиентов
 */
router.get("/clients", getClients);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *       404:
 *         description: Пользователь не найден
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать пользователя (регистрация)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Пользователь создан
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Обновить пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь обновлен
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Удалить пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Пользователь удален
 */
router.delete("/:id", authMiddleware, deleteUser);

export default router; 