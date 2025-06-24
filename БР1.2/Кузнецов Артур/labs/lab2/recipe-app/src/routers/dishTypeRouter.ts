import { Router } from 'express';
import {
    createDishType,
    deleteDishType,
    getDishType,
    getDishTypes,
    updateDishType,
} from '../controllers/dishTypeController';
import { authMiddleware } from '../middleware/authMiddleware';
import { adminOnlyMiddleware } from '../middleware/adminOnlyMiddleware';

const router = Router();

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
router.get('/', getDishTypes);

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
router.get('/:id', getDishType);

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
router.post('/', authMiddleware, adminOnlyMiddleware, createDishType);

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
router.put('/:id', authMiddleware, adminOnlyMiddleware, updateDishType);

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
router.delete('/:id', authMiddleware, adminOnlyMiddleware, deleteDishType);

export default router;
