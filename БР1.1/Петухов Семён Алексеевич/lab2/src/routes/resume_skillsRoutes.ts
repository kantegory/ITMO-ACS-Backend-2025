import { Router } from "express";
import * as controller from "../controllers/resume_skillsController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ResumeSkills
 *   description: Связь резюме и навыков
 */

/**
 * @swagger
 * /api/resume-skills:
 *   get:
 *     summary: Получить все связи резюме и навыков
 *     tags: [ResumeSkills]
 *     responses:
 *       200:
 *         description: Список связей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ResumeSkill'
 */
router.get("/", controller.getAllResumeSkills);

/**
 * @swagger
 * /api/resume-skills/{id}:
 *   get:
 *     summary: Получить связь резюме и навыка по ID
 *     tags: [ResumeSkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResumeSkill'
 *       404:
 *         description: Связь не найдена
 */
router.get("/:id", controller.getResumeSkillById);

/**
 * @swagger
 * /api/resume-skills:
 *   post:
 *     summary: Создать связь между резюме и навыком
 *     tags: [ResumeSkills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeId
 *               - skillId
 *             properties:
 *               resumeId:
 *                 type: integer
 *               skillId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Связь создана
 */
router.post("/", controller.createResumeSkill);

/**
 * @swagger
 * /api/resume-skills/{id}:
 *   put:
 *     summary: Обновить связь между резюме и навыком
 *     tags: [ResumeSkills]
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
 *             properties:
 *               resumeId:
 *                 type: integer
 *               skillId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Связь обновлена
 *       404:
 *         description: Связь не найдена
 */
router.put("/:id", controller.updateResumeSkill);

/**
 * @swagger
 * /api/resume-skills/{id}:
 *   delete:
 *     summary: Удалить связь между резюме и навыком
 *     tags: [ResumeSkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь удалена
 *       404:
 *         description: Связь не найдена
 */
router.delete("/:id", controller.deleteResumeSkill);

export default router;
