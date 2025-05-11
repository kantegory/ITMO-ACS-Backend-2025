import { Router } from "express";
import * as controller from "../controllers/applicationController";

const router = Router();

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Получить список всех заявок
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: Список заявок успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 */
router.get("/", controller.getAllApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Получить заявку по ID
 *     tags: [Applications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заявки
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Заявка не найдена
 */
router.get("/:id", controller.getApplicationById);

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Создать новую заявку
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - vacancyId
 *             properties:
 *               userId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Заявка успешно создана
 *       400:
 *         description: Неверные входные данные
 */
router.post("/", controller.createApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   put:
 *     summary: Обновить заявку по ID
 *     tags: [Applications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заявки
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
 *               userId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Заявка обновлена
 *       404:
 *         description: Заявка не найдена
 */
router.put("/:id", controller.updateApplication);

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Удалить заявку по ID
 *     tags: [Applications]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID заявки
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Заявка удалена
 *       404:
 *         description: Заявка не найдена
 */
router.delete("/:id", controller.deleteApplication);

export default router;
