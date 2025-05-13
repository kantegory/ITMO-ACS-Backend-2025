import { Router } from "express";
import * as resumeController from "../controller/resume.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: API для работы с резюме
 */

/**
 * @swagger
 * /api/resumes:
 *   post:
 *     summary: Создать новое резюме
 *     tags: [Resumes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - skills
 *               - contactInfo
 *             properties:
 *               userId:
 *                 type: integer
 *               title:
 *                 type: string
 *               skills:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Резюме успешно создано
 */
router.post("/resumes", resumeController.createResume);

/**
 * @swagger
 * /api/resumes:
 *   get:
 *     summary: Получить список всех резюме
 *     tags: [Resumes]
 *     responses:
 *       200:
 *         description: Список резюме
 */
router.get("/resumes", resumeController.getResumes);

/**
 * @swagger
 * /api/resumes/{id}:
 *   get:
 *     summary: Получить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     responses:
 *       200:
 *         description: Резюме найдено
 *       404:
 *         description: Резюме не найдено
 */
router.get("/resumes/:id", resumeController.getResumeById);

/**
 * @swagger
 * /api/resumes/{id}:
 *   put:
 *     summary: Обновить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               skills:
 *                 type: string
 *               contactInfo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Резюме обновлено
 *       404:
 *         description: Резюме не найдено
 */
router.put("/resumes/:id", resumeController.updateResume);

/**
 * @swagger
 * /api/resumes/{id}:
 *   delete:
 *     summary: Удалить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID резюме
 *     responses:
 *       204:
 *         description: Резюме удалено
 *       404:
 *         description: Резюме не найдено
 */
router.delete("/resumes/:id", resumeController.deleteResume);

export default router;
