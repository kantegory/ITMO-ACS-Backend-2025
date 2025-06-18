"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dishTypeController_1 = require("../controllers/dishTypeController");
const authMiddleware_1 = require("common-service/src/middleware/authMiddleware");
const adminOnlyMiddleware_1 = require("common-service/src/middleware/adminOnlyMiddleware");
const router = (0, express_1.Router)();
/**
 * @openapi
 * tags:
 *   - name: DishType
 */
/**
 * @openapi
 * /dish-type/:
 *   get:
 *     tags:
 *       - DishType
 *     summary: Список типов блюд
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DishType'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', dishTypeController_1.getDishTypes);
/**
 * @openapi
 * /dish-type/{id}:
 *   get:
 *     tags:
 *       - DishType
 *     summary: Тип блюда
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID типа блюда
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DishType'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', dishTypeController_1.getDishType);
/**
 * @openapi
 * /dish-type/:
 *   post:
 *     tags:
 *       - DishType
 *     summary: Создать тип блюда
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       201:
 *         description: Created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DishType'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, dishTypeController_1.createDishType);
/**
 * @openapi
 * /dish-type/{id}:
 *   put:
 *     tags:
 *       - DishType
 *     summary: Обновить тип блюда
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID типа блюда
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *     responses:
 *       200:
 *         description: Updated Successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, dishTypeController_1.updateDishType);
/**
 * @openapi
 * /dish-type/{id}:
 *   delete:
 *     tags:
 *       - DishType
 *     summary: Удалить тип блюда
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID типа блюда
 *     responses:
 *       204:
 *         description: Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access Denied
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authMiddleware_1.authMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, dishTypeController_1.deleteDishType);
exports.default = router;
