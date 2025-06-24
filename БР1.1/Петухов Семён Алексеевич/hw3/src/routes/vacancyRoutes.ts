import { Router } from "express";
import * as controller from "../controllers/vacancyController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vacancies
 *   description: Управление вакансиями
 */

/**
 * @swagger
 * /api/vacancies:
 *   get:
 *     summary: Получить список всех вакансий
 *     tags: [Vacancies]
 *     responses:
 *       200:
 *         description: Список вакансий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacancy'
 */
router.get("/", controller.getAllVacancies);

/**
 * @swagger
 * /api/vacancies/{id}:
 *   get:
 *     summary: Получить вакансию по ID
 *     tags: [Vacancies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о вакансии
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       404:
 *         description: Вакансия не найдена
 */
router.get("/:id", controller.getVacancyById);

/**
 * @swagger
 * /api/vacancies:
 *   post:
 *     summary: Создать новую вакансию
 *     tags: [Vacancies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vacancy'
 *     responses:
 *       201:
 *         description: Вакансия создана
 */
router.post("/", controller.createVacancy);

/**
 * @swagger
 * /api/vacancies/{id}:
 *   put:
 *     summary: Обновить вакансию по ID
 *     tags: [Vacancies]
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
 *             $ref: '#/components/schemas/Vacancy'
 *     responses:
 *       200:
 *         description: Вакансия обновлена
 *       404:
 *         description: Вакансия не найдена
 */
router.put("/:id", controller.updateVacancy);

/**
 * @swagger
 * /api/vacancies/{id}:
 *   delete:
 *     summary: Удалить вакансию по ID
 *     tags: [Vacancies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Вакансия удалена
 *       404:
 *         description: Вакансия не найдена
 */
router.delete("/:id", controller.deleteVacancy);

export default router;
