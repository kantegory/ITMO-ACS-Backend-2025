/**
 * @swagger
 * tags:
 *   name: Vacancy
 *   description: Вакансии компаний
 */

/**
 * @swagger
 * /vacancy:
 *   get:
 *     tags: [Vacancy]
 *     summary: Получить список всех вакансий
 *     responses:
 *       200:
 *         description: Список вакансий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vacancy'
 *
 *   post:
 *     tags: [Vacancy]
 *     summary: Создать новую вакансию
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacancyInput'
 *     responses:
 *       201:
 *         description: Вакансия успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *
 * /vacancnp/{id}:
 *   get:
 *     tags: [Vacancy]
 *     summary: Получить вакансию по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Вакансия
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *
 *   put:
 *     tags: [Vacancy]
 *     summary: Обновить вакансию по ID
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
 *             $ref: '#/components/schemas/VacancyInput'
 *     responses:
 *       200:
 *         description: Вакансия обновлена
 *
 *   delete:
 *     tags: [Vacancy]
 *     summary: Удалить вакансию по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Вакансия удалена
 */

import {NextFunction, Request, RequestHandler, Response, Router} from "express";
import * as controller from "../controllers/vacancyController";
import { verifyToken } from "../libs/auth";
const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const router = Router();

router.get("/", verifyToken, controller.getAllVacancies);

router.get("/:id", verifyToken, controller.getVacancyById);

router.post("/", verifyToken, asyncHandler(controller.createVacancy));

router.put("/:id", verifyToken, controller.updateVacancy);

router.delete("/:id", verifyToken, controller.deleteVacancy);

export default router;
