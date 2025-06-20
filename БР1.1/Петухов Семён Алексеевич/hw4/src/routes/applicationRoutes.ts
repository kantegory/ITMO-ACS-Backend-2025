/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Работа с откликами на вакансии
 */

/**
 * @swagger
 * /applications:
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
 * /applications/{id}:
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

const router = Router();

router.get("/", controller.getAllApplications);
router.get("/:id", controller.getApplicationById);
router.post("/", controller.createApplication);
router.put("/:id", controller.updateApplication);
router.delete("/:id", controller.deleteApplication);

export default router;
