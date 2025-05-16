import { Router } from "express";
import * as controller from "../controllers/resumeController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: Управление резюме
 */

/**
 * @swagger
 * /api/resumes:
 *   get:
 *     summary: Получить список всех резюме
 *     tags: [Resumes]
 *     responses:
 *       200:
 *         description: Список резюме
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resume'
 */
router.get("/", controller.getAllResumes);

/**
 * @swagger
 * /api/resumes/{id}:
 *   get:
 *     summary: Получить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Резюме найдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Резюме не найдено
 */
router.get("/:id", controller.getResumeById);

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
 *               - user
 *               - full_name
 *               - date_of_birth
 *               - work_experience
 *               - skills
 *               - salary
 *               - education
 *               - additional_information
 *             properties:
 *               user:
 *                 type: integer
 *                 description: ID пользователя, создающего резюме
 *               full_name:
 *                 type: string
 *                 description: Полное имя пользователя
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Дата рождения пользователя
 *               work_experience:
 *                 type: string
 *                 description: Описание опыта работы
 *               skills:
 *                 type: string
 *                 description: Навыки пользователя
 *               salary:
 *                 type: number
 *                 format: float
 *                 description: Ожидаемая зарплата
 *               education:
 *                 type: integer
 *                 description: ID образования пользователя
 *               additional_information:
 *                 type: string
 *                 description: Дополнительная информация
 *     responses:
 *       201:
 *         description: Резюме создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       400:
 *         description: Неверные данные
 */

router.post("/", controller.createResume);

/**
 * @swagger
 * /api/resumes/{id}:
 *   put:
 *     summary: Обновить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - date_of_birth
 *               - work_experience
 *               - skills
 *               - salary
 *               - education
 *               - additional_information
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Полное имя пользователя
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Дата рождения пользователя
 *               work_experience:
 *                 type: string
 *                 description: Описание опыта работы
 *               skills:
 *                 type: string
 *                 description: Навыки пользователя
 *               salary:
 *                 type: number
 *                 format: float
 *                 description: Ожидаемая зарплата
 *               education:
 *                 type: integer
 *                 description: ID образования пользователя
 *               additional_information:
 *                 type: string
 *                 description: Дополнительная информация
 *     responses:
 *       200:
 *         description: Резюме обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *       404:
 *         description: Резюме не найдено
 */

router.put("/:id", controller.updateResume);

/**
 * @swagger
 * /api/resumes/{id}:
 *   delete:
 *     summary: Удалить резюме по ID
 *     tags: [Resumes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Резюме удалено
 *       404:
 *         description: Резюме не найдено
 */
router.delete("/:id", controller.deleteResume);

export default router;
