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
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       201:
 *         description: Резюме создано
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
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       200:
 *         description: Резюме обновлено
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
