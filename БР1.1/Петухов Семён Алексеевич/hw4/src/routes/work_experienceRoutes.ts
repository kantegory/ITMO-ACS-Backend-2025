/**
 * @swagger
 * tags:
 *   name: WorkExperience
 *   description: Опыт работы пользователей
 */

/**
 * @swagger
 * /work-experiences:
 *   get:
 *     tags: [WorkExperience]
 *     summary: Получить список всех записей опыта работы
 *     responses:
 *       200:
 *         description: Список опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperience'
 *
 *   post:
 *     tags: [WorkExperience]
 *     summary: Создать новую запись опыта работы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperienceInput'
 *     responses:
 *       201:
 *         description: Запись создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperience'
 *
 * /work-experiences/{id}:
 *   get:
 *     tags: [WorkExperience]
 *     summary: Получить запись опыта работы по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запись опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperience'
 *
 *   put:
 *     tags: [WorkExperience]
 *     summary: Обновить запись опыта работы по ID
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
 *             $ref: '#/components/schemas/WorkExperienceInput'
 *     responses:
 *       200:
 *         description: Запись обновлена
 *
 *   delete:
 *     tags: [WorkExperience]
 *     summary: Удалить запись опыта работы по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Запись удалена
 */

import { Router } from "express";
import * as controller from "../controllers/work_experienceController";
import { SwaggerDefinition } from 'swagger-jsdoc';

const router = Router();

router.get("/", controller.getAllWorkExperiences);

router.get("/:id", controller.getWorkExperienceById);

router.post("/", controller.createWorkExperience);

router.put("/:id", controller.updateWorkExperience);

router.delete("/:id", controller.deleteWorkExperience);

export default router;
