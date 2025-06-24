/**
 * @swagger
 * tags:
 *   name: ResumeSkills
 *   description: Работа с навыками резюме
 */

/**
 * @swagger
 * /resume-skills:
 *   get:
 *     tags: [ResumeSkills]
 *     summary: Получить все навыки резюме
 *     responses:
 *       200:
 *         description: Список навыков резюме
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResumeSkills'
 *
 *   post:
 *     tags: [ResumeSkills]
 *     summary: Добавить навык к резюме
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResumeSkillsInput'
 *     responses:
 *       201:
 *         description: Навык добавлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeSkills'
 *
 * /resume-skills/{id}:
 *   get:
 *     tags: [ResumeSkills]
 *     summary: Получить навык резюме по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Один навык резюме
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeSkills'
 *
 *   put:
 *     tags: [ResumeSkills]
 *     summary: Обновить навык резюме
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
 *             $ref: '#/components/schemas/ResumeSkillsInput'
 *     responses:
 *       200:
 *         description: Навык резюме обновлён
 *
 *   delete:
 *     tags: [ResumeSkills]
 *     summary: Удалить навык резюме
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
import * as controller from "../controllers/resume_skillsController";

const router = Router();

router.get("/", controller.getAllResumeSkills);

router.get("/:id", controller.getResumeSkillById);

router.post("/", controller.createResumeSkill);

router.put("/:id", controller.updateResumeSkill);

router.delete("/:id", controller.deleteResumeSkill);

export default router;
