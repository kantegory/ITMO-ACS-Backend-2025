import { Router } from "express";
import * as jobController from "../controller/job.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API для работы с вакансиями
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Создать новую вакансию
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - description
 *               - requirements
 *               - salaryMin
 *               - salaryMax
 *               - experience
 *               - location
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salaryMin:
 *                 type: integer
 *               salaryMax:
 *                 type: integer
 *               experience:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Вакансия успешно создана
 */
router.post("/jobs", jobController.createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Получить список всех вакансий
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Список вакансий
 */
router.get("/jobs", jobController.getJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Получить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
 *     responses:
 *       200:
 *         description: Вакансия найдена
 *       404:
 *         description: Вакансия не найдена
 */
router.get("/jobs/:id", jobController.getJobById);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Обновить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               requirements:
 *                 type: string
 *               salaryMin:
 *                 type: integer
 *               salaryMax:
 *                 type: integer
 *               experience:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Вакансия обновлена
 *       404:
 *         description: Вакансия не найдена
 */
router.put("/jobs/:id", jobController.updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Удалить вакансию по ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID вакансии
 *     responses:
 *       204:
 *         description: Вакансия удалена
 *       404:
 *         description: Вакансия не найдена
 */
router.delete("/jobs/:id", jobController.deleteJob);

export default router;
