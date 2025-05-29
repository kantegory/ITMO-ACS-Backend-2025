/**
 * @swagger
 * tags:
 *   name: Resumes
 *   description: Работа с резюме
 */

/**
 * @swagger
 * /resumes:
 *   get:
 *     tags: [Resumes]
 *     summary: Получить все резюме
 *     responses:
 *       200:
 *         description: Список резюме
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resume'
 *
 *   post:
 *     tags: [Resumes]
 *     summary: Создать новое резюме
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResumeInput'
 *     responses:
 *       201:
 *         description: Резюме создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *
 * /resumes/{id}:
 *   get:
 *     tags: [Resumes]
 *     summary: Получить резюме по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Одно резюме
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resume'
 *
 *   put:
 *     tags: [Resumes]
 *     summary: Обновить резюме
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
 *             $ref: '#/components/schemas/ResumeInput'
 *     responses:
 *       200:
 *         description: Резюме обновлено
 *
 *   delete:
 *     tags: [Resumes]
 *     summary: Удалить резюме
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Удалено
 */
import { Router } from "express";
import * as controller from "../controllers/resumeController";

const router = Router();

router.get("/", controller.getAllResumes);


router.get("/:id", controller.getResumeById);



router.post("/", controller.createResume);

router.put("/:id", controller.updateResume);


router.delete("/:id", controller.deleteResume);

export default router;
