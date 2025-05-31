/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Работа с пользователями
 */

/**
 * @swagger
 * /user:
 *   get:
 *     tags: [Users]
 *     summary: Получить список всех пользователей
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     tags: [Users]
 *     summary: Создать нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 * /user/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Получить пользователя по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о пользователе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *
 *   put:
 *     tags: [Users]
 *     summary: Обновить данные пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Пользователь обновлён
 *
 *   delete:
 *     tags: [Users]
 *     summary: Удалить пользователя
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Пользователь удалён
 */
import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/userController";

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const router = Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", asyncHandler(createUser));

router.put("/:id", updateUser);

router.delete("/:id", asyncHandler(deleteUser));

export default router;
