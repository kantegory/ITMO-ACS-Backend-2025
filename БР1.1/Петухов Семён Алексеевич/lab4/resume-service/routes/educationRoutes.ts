/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: Работа с уровнями образования
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         education_level:
 *           type: string
 *       example:
 *         id: 1
 *         education_level: Высшее
 *
 *     EducationInput:
 *       type: object
 *       properties:
 *         education_level:
 *           type: string
 *       required:
 *         - education_level
 *       example:
 *         education_level: Среднее специальное
 */

/**
 * @swagger
 * /education:
 *   get:
 *     tags:
 *       - Educations
 *     summary: Получить все уровни образования
 *     responses:
 *       200:
 *         description: Список уровней образования
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 *
 *   post:
 *     tags:
 *       - Educations
 *     summary: Создать уровень образования
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationInput'
 *     responses:
 *       201:
 *         description: Уровень образования создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *
 * /education/{id}:
 *   get:
 *     tags:
 *       - Educations
 *     summary: Получить уровень образования по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Один уровень образования
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *
 *   put:
 *     tags:
 *       - Educations
 *     summary: Обновить уровень образования
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
 *             $ref: '#/components/schemas/EducationInput'
 *     responses:
 *       200:
 *         description: Уровень обновлён
 *
 *   delete:
 *     tags:
 *       - Educations
 *     summary: Удалить уровень образования
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
import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import * as controller from "../controllers/educationController";

const router = Router();

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

router.get("/", controller.getAllEducations);
router.get("/:id", controller.getEducationById);

router.post("/", asyncHandler(controller.createEducation));

router.put("/:id", controller.updateEducation);

router.delete("/:id", controller.deleteEducation);

export default router;
