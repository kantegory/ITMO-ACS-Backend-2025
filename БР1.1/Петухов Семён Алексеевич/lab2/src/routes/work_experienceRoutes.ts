import { Router } from "express";
import * as controller from "../controllers/work_experienceController";
import { SwaggerDefinition } from 'swagger-jsdoc';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Work Experiences
 *   description: Управление опытом работы
 */

/**
 * @swagger
 * /api/work-experiences:
 *   get:
 *     summary: Получить все записи опыта работы
 *     tags: [Work Experiences]
 *     responses:
 *       200:
 *         description: Список всех записей опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   company:
 *                     type: string
 *                   start_date:
 *                     type: string
 *                   end_date:
 *                     type: string
 *       500:
 *         description: Ошибка на сервере
 */
router.get("/", controller.getAllWorkExperiences);

/**
 * @swagger
 * /api/work-experiences/{id}:
 *   get:
 *     summary: Получить опыт работы по ID
 *     tags: [Work Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID опыта работы
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Описание опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 company:
 *                   type: string
 *                 start_date:
 *                   type: string
 *                 end_date:
 *                   type: string
 *       404:
 *         description: Запись не найдена
 *       500:
 *         description: Ошибка на сервере
 */
router.get("/:id", controller.getWorkExperienceById);

/**
 * @swagger
 * /api/work-experiences:
 *   post:
 *     summary: Создать новый опыт работы
 *     tags: [Work Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - company
 *               - start_date
 *               - end_date
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Новый опыт работы был успешно создан
 *       400:
 *         description: Ошибка в данных
 *       500:
 *         description: Ошибка на сервере
 */
router.post("/", controller.createWorkExperience);

/**
 * @swagger
 * /api/work-experiences/{id}:
 *   put:
 *     summary: Обновить опыт работы по ID
 *     tags: [Work Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID опыта работы
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Описание обновленного опыта работы
 *       400:
 *         description: Ошибка в данных
 *       404:
 *         description: Запись не найдена
 *       500:
 *         description: Ошибка на сервере
 */
router.put("/:id", controller.updateWorkExperience);

/**
 * @swagger
 * /api/work-experiences/{id}:
 *   delete:
 *     summary: Удалить опыт работы по ID
 *     tags: [Work Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID опыта работы
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Опыта работы успешно удален
 *       404:
 *         description: Запись не найдена
 *       500:
 *         description: Ошибка на сервере
 */
router.delete("/:id", controller.deleteWorkExperience);

export default router;
