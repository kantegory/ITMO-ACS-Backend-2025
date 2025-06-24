/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Работа с откликами на вакансии
 */

/**
 * @swagger
 * /application:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Получить все отклики
 *     responses:
 *       200:
 *         description: Список откликов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *
 *   post:
 *     tags:
 *       - Applications
 *     summary: Создать отклик
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationInput'
 *     responses:
 *       201:
 *         description: Отклик создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *
 * /application/{id}:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Получить отклик по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Один отклик
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *
 *   put:
 *     tags:
 *       - Applications
 *     summary: Обновить отклик
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
 *             $ref: '#/components/schemas/ApplicationInput'
 *     responses:
 *       200:
 *         description: Отклик обновлён
 *
 *   delete:
 *     tags:
 *       - Applications
 *     summary: Удалить отклик
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Удалено
 */

import { Router } from "express";
import * as controller from "../controllers/applicationController";
import { verifyToken } from "../libs/auth";
const router = Router();

router.get("/", verifyToken, controller.getAllApplications);
router.get("/:id", verifyToken, controller.getApplicationById);
router.post("/", verifyToken, controller.createApplication);
router.put("/:id", verifyToken, controller.updateApplication);
router.delete("/:id", verifyToken, controller.deleteApplication);

export default router;
