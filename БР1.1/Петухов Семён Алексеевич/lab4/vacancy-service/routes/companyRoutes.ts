import { Router, Request, Response, NextFunction, RequestHandler } from "express";
import * as controller from "../controllers/companyController";

const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API для управления компаниями
 */

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Получить список всех компаний
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Список компаний
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
 * /company/{id}:
 *   get:
 *     summary: Получить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
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
 * /company:
 *   post:
 *     summary: Создать новую компанию
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       201:
 *         description: Компания успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
router.post("/", asyncHandler(controller.createCompany));

/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Обновить данные компании по ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID компании
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyInput'
 *     responses:
 *       200:
 *         description: Компания обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Компания не найдена
 */
router.put("/:id", controller.updateCompany);

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Удалить компанию по ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID компании
 *     responses:
 *       204:
 *         description: Компания удалена
 *       404:
 *         description: Компания не найдена
 */
router.delete("/:id", controller.deleteCompany);

export default router;
