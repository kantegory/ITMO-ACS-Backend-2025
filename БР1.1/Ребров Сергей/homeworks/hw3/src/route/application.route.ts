import { Router } from "express";
import * as applicationController from "../controller/application.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: API для работы с откликами на вакансии
 */

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Создать отклик на вакансию
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - jobId
 *               - coverLetter
 *               - status
 *             properties:
 *               userId:
 *                 type: integer
 *               jobId:
 *                 type: integer
 *               coverLetter:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Отклик успешно создан
 */
router.post("/applications", applicationController.createApplication);

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Получить список всех откликов
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Список откликов
 */
router.get("/applications", applicationController.getApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Получить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     responses:
 *       200:
 *         description: Отклик найден
 *       404:
 *         description: Отклик не найден
 */
router.get("/applications/:id", applicationController.getApplicationById);

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Обновить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverLetter:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Отклик обновлён
 *       404:
 *         description: Отклик не найден
 */
router.put("/applications/:id", applicationController.updateApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Удалить отклик по ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID отклика
 *     responses:
 *       204:
 *         description: Отклик удалён
 *       404:
 *         description: Отклик не найден
 */
router.delete("/applications/:id", applicationController.deleteApplication);

export default router;
