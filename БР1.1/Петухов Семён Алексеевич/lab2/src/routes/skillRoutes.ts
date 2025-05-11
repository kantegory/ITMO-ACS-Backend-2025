import { Router } from "express";
import * as controller from "../controllers/skillController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Управление навыками
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Получить все навыки
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Список всех навыков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 */
router.get("/", controller.getAllSkills);

/**
 * @swagger
 * /api/skills/{id}:
 *   get:
 *     summary: Получить навык по ID
 *     tags: [Skills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Найденный навык
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *       404:
 *         description: Навык не найден
 */
router.get("/:id", controller.getSkillById);

/**
 * @swagger
 * /api/skills:
 *   post:
 *     summary: Создать новый навык
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       201:
 *         description: Навык создан
 */
router.post("/", controller.createSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   put:
 *     summary: Обновить навык по ID
 *     tags: [Skills]
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
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       200:
 *         description: Навык обновлён
 *       404:
 *         description: Навык не найден
 */
router.put("/:id", controller.updateSkill);

/**
 * @swagger
 * /api/skills/{id}:
 *   delete:
 *     summary: Удалить навык по ID
 *     tags: [Skills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Навык удалён
 *       404:
 *         description: Навык не найден
 */
router.delete("/:id", controller.deleteSkill);

export default router;
