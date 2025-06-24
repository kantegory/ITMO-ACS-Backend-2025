import { Router } from "express";
import * as controller from "../controllers/vacancy_skillsController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VacancySkills
 *   description: Управление навыками вакансий
 */

/**
 * @swagger
 * /api/vacancy-skills:
 *   get:
 *     summary: Получить все навыки, связанные с вакансиями
 *     tags: [VacancySkills]
 *     responses:
 *       200:
 *         description: Список всех навыков вакансий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/VacancySkill'
 */
router.get("/", controller.getAllVacancySkills);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   get:
 *     summary: Получить навык вакансии по ID
 *     tags: [VacancySkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Найденный навык вакансии
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VacancySkill'
 *       404:
 *         description: Навык не найден
 */
router.get("/:id", controller.getVacancySkillById);

/**
 * @swagger
 * /api/vacancy-skills:
 *   post:
 *     summary: Создать новый навык для вакансии
 *     tags: [VacancySkills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacancySkill'
 *     responses:
 *       201:
 *         description: Навык добавлен
 */
router.post("/", controller.createVacancySkill);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   put:
 *     summary: Обновить навык вакансии по ID
 *     tags: [VacancySkills]
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
 *             $ref: '#/components/schemas/VacancySkill'
 *     responses:
 *       200:
 *         description: Навык обновлён
 *       404:
 *         description: Навык не найден
 */
router.put("/:id", controller.updateVacancySkill);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   delete:
 *     summary: Удалить навык вакансии по ID
 *     tags: [VacancySkills]
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
router.delete("/:id", controller.deleteVacancySkill);

export default router;
