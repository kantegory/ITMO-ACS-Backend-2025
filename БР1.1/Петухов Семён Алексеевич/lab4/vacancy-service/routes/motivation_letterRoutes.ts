/**
 * @swagger
 * tags:
 *   name: MotivationLetters
 *   description: Работа с мотивационными письмами
 */

/**
 * @swagger
 * /motivation_letter:
 *   get:
 *     tags: [MotivationLetters]
 *     summary: Получить все мотивационные письма
 *     responses:
 *       200:
 *         description: Список писем
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MotivationLetter'

 *   post:
 *     tags: [MotivationLetters]
 *     summary: Создать мотивационное письмо
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MotivationLetterInput'
 *     responses:
 *       201:
 *         description: Письмо создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivationLetter'

 * /motivation_letter/{id}:
 *   get:
 *     tags: [MotivationLetters]
 *     summary: Получить мотивационное письмо по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Одно письмо
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MotivationLetter'

 *   put:
 *     tags: [MotivationLetters]
 *     summary: Обновить письмо
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
 *             $ref: '#/components/schemas/MotivationLetterInput'
 *     responses:
 *       200:
 *         description: Письмо обновлено

 *   delete:
 *     tags: [MotivationLetters]
 *     summary: Удалить письмо
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

import {NextFunction, Request, RequestHandler, Response, Router} from "express";
import * as controller from "../controllers/motivation_letterController";

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
const router = Router();

router.get("/", controller.getAllLetters);


router.get("/:id", controller.getLetterById);


router.post("/", asyncHandler(controller.createLetter));


router.put("/:id", asyncHandler(controller.updateLetter));

router.delete("/:id", controller.deleteLetter);

export default router;
