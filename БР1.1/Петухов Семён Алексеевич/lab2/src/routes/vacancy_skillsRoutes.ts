import { Router } from "express";
import * as controller from "../controllers/vacancy_skillsController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VacancySkills
 *   description: Связь вакансий и навыков
 */

/**
 * @swagger
 * /api/vacancy-skills:
 *   get:
 *     summary: Получить все связи вакансий и навыков
 *     tags: [VacancySkills]
 *     responses:
 *       200:
 *         description: Список всех связей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vacancy:
 *                     type: integer
 *                   skill:
 *                     type: integer
 */
router.get("/", controller.getAllVacancySkills);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   get:
 *     summary: Получить связь между вакансией и навыком по ID
 *     tags: [VacancySkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Найденная связь
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 vacancy:
 *                   type: integer
 *                 skill:
 *                   type: integer
 *       404:
 *         description: Связь не найдена
 */
router.get("/:id", controller.getVacancySkillById);

/**
 * @swagger
 * /api/vacancy-skills:
 *   post:
 *     summary: Создать связь между вакансией и навыком
 *     tags: [VacancySkills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vacancy
 *               - skill
 *             properties:
 *               vacancy:
 *                 type: integer
 *               skill:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Связь создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 vacancy:
 *                   type: integer
 *                 skill:
 *                   type: integer
 */
router.post("/", controller.createVacancySkill);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   put:
 *     summary: Обновить связь между вакансией и навыком
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
 *             type: object
 *             properties:
 *               vacancy:
 *                 type: integer
 *               skill:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Связь обновлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 vacancy:
 *                   type: integer
 *                 skill:
 *                   type: integer
 *       404:
 *         description: Связь не найдена
 */
router.put("/:id", controller.updateVacancySkill);

/**
 * @swagger
 * /api/vacancy-skills/{id}:
 *   delete:
 *     summary: Удалить связь между вакансией и навыком
 *     tags: [VacancySkills]
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
router.delete("/:id", controller.deleteVacancySkill);

export default router;
