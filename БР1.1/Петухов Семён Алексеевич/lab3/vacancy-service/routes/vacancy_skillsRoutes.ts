/**
 * @swagger
 * tags:
 *   name: VacancySkills
 *   description: Навыки, связанные с вакансиями
 */

/**
 * @swagger
 * /vacancy_skill:
 *   get:
 *     tags: [VacancySkills]
 *     summary: Получить список всех навыков для вакансий
 *     responses:
 *       200:
 *         description: Список связей вакансий и навыков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VacancySkills'
 *
 *   post:
 *     tags: [VacancySkills]
 *     summary: Добавить навык к вакансии
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacancySkillsInput'
 *     responses:
 *       201:
 *         description: Навык добавлен к вакансии
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VacancySkills'
 *
 * /vacancy_skill/{id}:
 *   get:
 *     tags: [VacancySkills]
 *     summary: Получить навык вакансии по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Связь вакансия-навык
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VacancySkills'
 *
 *   put:
 *     tags: [VacancySkills]
 *     summary: Обновить навык вакансии по ID
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
 *             $ref: '#/components/schemas/VacancySkillsInput'
 *     responses:
 *       200:
 *         description: Навык вакансии обновлён
 *
 *   delete:
 *     tags: [VacancySkills]
 *     summary: Удалить навык вакансии по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Навык вакансии удалён
 */
import { Router } from "express";
import * as controller from "../controllers/vacancy_skillsController";
import { verifyToken } from "../libs/auth";
const router = Router();


router.get("/", verifyToken, controller.getAllVacancySkills);

router.get("/:id", verifyToken, controller.getVacancySkillById);

router.post("/", verifyToken, controller.createVacancySkill);

router.put("/:id", verifyToken, controller.updateVacancySkill);

router.delete("/:id", verifyToken, controller.deleteVacancySkill);

export default router;
