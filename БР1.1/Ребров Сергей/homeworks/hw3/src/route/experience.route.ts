import { Router } from "express";
import * as experienceController from "../controller/experience.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Experiences
 *   description: API для работы с опытом
 */

/**
 * @swagger
 * /api/experiences:
 *   post:
 *     summary: Создать новый опыт
 *     tags: [Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeId
 *               - title
 *               - description
 *               - company
 *               - startDate
 *               - endDate
 *             properties:
 *               resumeId:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               company:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Опыт успешно создан
 */
router.post("/experiences", experienceController.createExperience);

/**
 * @swagger
 * /api/experiences:
 *   get:
 *     summary: Получить список всех опытов
 *     tags: [Experiences]
 *     responses:
 *       200:
 *         description: Список опытов
 */
router.get("/experiences", experienceController.getExperiences);

/**
 * @swagger
 * /api/experiences/{id}:
 *   get:
 *     summary: Получить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
 *     responses:
 *       200:
 *         description: Опыт найден
 *       404:
 *         description: Опыт не найден
 */
router.get("/experiences/:id", experienceController.getExperienceById);

/**
 * @swagger
 * /api/experiences/{id}:
 *   put:
 *     summary: Обновить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
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
 *               company:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Опыт обновлен
 *       404:
 *         description: Опыт не найден
 */
router.put("/experiences/:id", experienceController.updateExperience);

/**
 * @swagger
 * /api/experiences/{id}:
 *   delete:
 *     summary: Удалить опыт по ID
 *     tags: [Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID опыта
 *     responses:
 *       204:
 *         description: Опыт удален
 *       404:
 *         description: Опыт не найден
 */
router.delete("/experiences/:id", experienceController.deleteExperience);

export default router;
