/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Работа с навыками
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     tags: [Skills]
 *     summary: Получить все навыки
 *     responses:
 *       200:
 *         description: Список навыков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *
 *   post:
 *     tags: [Skills]
 *     summary: Создать новый навык
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       201:
 *         description: Навык создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *
 * /skills/{id}:
 *   get:
 *     tags: [Skills]
 *     summary: Получить навык по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Один навык
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *
 *   put:
 *     tags: [Skills]
 *     summary: Обновить навык
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
 *             $ref: '#/components/schemas/SkillInput'
 *     responses:
 *       200:
 *         description: Навык обновлён
 *
 *   delete:
 *     tags: [Skills]
 *     summary: Удалить навык
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
import * as controller from "../controllers/skillController";

const router = Router();


router.get("/", controller.getAllSkills);

router.get("/:id", controller.getSkillById);

router.post("/", controller.createSkill);

router.put("/:id", controller.updateSkill);

router.delete("/:id", controller.deleteSkill);

export default router;
