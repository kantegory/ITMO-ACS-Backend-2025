import { Router } from "express";
import * as educationController from "../controller/education.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: API для работы с информацией об образовании
 */

/**
 * @swagger
 * /api/educations:
 *   post:
 *     summary: Создать запись об образовании
 *     tags: [Educations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeId
 *               - institution
 *               - degree
 *               - startDate
 *             properties:
 *               resumeId:
 *                 type: integer
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Запись об образовании успешно создана
 *       500:
 *         description: Ошибка сервера
 */
router.post("/educations", educationController.createEducation);

/**
 * @swagger
 * /api/educations:
 *   get:
 *     summary: Получить список всех записей об образовании
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: Список всех записей об образовании
 *       500:
 *         description: Ошибка сервера
 */
router.get("/educations", educationController.getEducations);

/**
 * @swagger
 * /api/educations/{id}:
 *   get:
 *     summary: Получить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     responses:
 *       200:
 *         description: Запись об образовании найдена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get("/educations/:id", educationController.getEducationById);

/**
 * @swagger
 * /api/educations/{id}:
 *   put:
 *     summary: Обновить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institution:
 *                 type: string
 *               degree:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Запись об образовании обновлена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.put("/educations/:id", educationController.updateEducation);

/**
 * @swagger
 * /api/educations/{id}:
 *   delete:
 *     summary: Удалить запись об образовании по ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID записи об образовании
 *     responses:
 *       204:
 *         description: Запись об образовании удалена
 *       404:
 *         description: Запись об образовании не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/educations/:id", educationController.deleteEducation);

export default router;
