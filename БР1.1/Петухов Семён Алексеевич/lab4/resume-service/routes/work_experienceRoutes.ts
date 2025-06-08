/**
 * @swagger
 * tags:
 *   name: WorkExperience
 *   description: Опыт работы пользователей
 */

/**
 * @swagger
 * /work_exp:
 *   get:
 *     tags: [WorkExperience]
 *     summary: Получить список всех записей опыта работы
 *     responses:
 *       200:
 *         description: Список опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkExperience'
 *
 *   post:
 *     tags: [WorkExperience]
 *     summary: Создать новую запись опыта работы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperienceInput'
 *     responses:
 *       201:
 *         description: Запись создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperience'
 *
 * /work_exp/{id}:
 *   get:
 *     tags: [WorkExperience]
 *     summary: Получить запись опыта работы по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Запись опыта работы
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkExperience'
 *
 *   put:
 *     tags: [WorkExperience]
 *     summary: Обновить запись опыта работы по ID
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
 *             $ref: '#/components/schemas/WorkExperienceInput'
 *     responses:
 *       200:
 *         description: Запись обновлена
 *
 *   delete:
 *     tags: [WorkExperience]
 *     summary: Удалить запись опыта работы по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Запись удалена
 */

import {NextFunction, Request, RequestHandler, Response, Router} from "express";
import * as controller from "../controllers/work_experienceController";
import { verifyToken } from "../libs/auth";

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
const router = Router();

router.get("/", verifyToken, controller.getAllWorkExperiences);

router.get("/:id", verifyToken, controller.getWorkExperienceById);

router.post("/", verifyToken, asyncHandler(controller.createWorkExperience));

router.put("/:id", verifyToken, controller.updateWorkExperience);

router.delete("/:id", verifyToken, controller.deleteWorkExperience);

export default router;
