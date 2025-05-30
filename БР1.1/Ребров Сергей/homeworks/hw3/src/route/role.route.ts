import { Router } from "express";
import * as roleController from "../controller/role.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API для работы с ролями
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Создать новую роль
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Роль успешно создана
 *       400:
 *         description: Отсутствует поле 'name'
 */
router.post("/roles", roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Получить все роли
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Список всех ролей
 */
router.get("/roles", roleController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Получить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       200:
 *         description: Роль найдена
 *       404:
 *         description: Роль не найдена
 */
router.get("/roles/:id", roleController.getRoleById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Обновить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Роль обновлена
 *       400:
 *         description: Некорректные данные
 *       404:
 *         description: Роль не найдена
 */
router.put("/roles/:id", roleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Удалить роль по ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID роли
 *     responses:
 *       204:
 *         description: Роль успешно удалена
 *       404:
 *         description: Роль не найдена
 */
router.delete("/roles/:id", roleController.deleteRole);

export default router;
