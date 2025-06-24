import { Router } from "express";
import * as controller from "../controllers/companyController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Управление компаниями
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Получить список всех компаний
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Успешное получение списка компаний
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/", controller.getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Получить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID компании
 *     responses:
 *       200:
 *         description: Компания найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Компания не найдена
 */
router.get("/:id", controller.getCompanyById);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Создать новую компанию
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Компания успешно создана
 *       400:
 *         description: Неверные данные
 */
router.post("/", controller.createCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Обновить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID компании
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Компания обновлена
 *       404:
 *         description: Компания не найдена
 */
router.put("/:id", controller.updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Удалить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID компании
 *     responses:
 *       200:
 *         description: Компания удалена
 *       404:
 *         description: Компания не найдена
 */
router.delete("/:id", controller.deleteCompany);

export default router;
