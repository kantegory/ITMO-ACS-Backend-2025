/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: Управление зданиями
 */

import { Router } from "express";
import { 
  getAllBuildings, 
  getBuildingById, 
  createBuilding, 
  updateBuilding, 
  deleteBuilding 
} from "../controllers/buildingController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /buildings:
 *   get:
 *     summary: Получить все здания
 *     tags: [Buildings]
 *     responses:
 *       200:
 *         description: Список зданий
 */
router.get("/", getAllBuildings);

/**
 * @swagger
 * /buildings/{id}:
 *   get:
 *     summary: Получить здание по ID
 *     tags: [Buildings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID здания
 *     responses:
 *       200:
 *         description: Данные здания
 *       404:
 *         description: Здание не найдено
 */
router.get("/:id", getBuildingById);

/**
 * @swagger
 * /buildings:
 *   post:
 *     summary: Создать здание
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Building'
 *     responses:
 *       201:
 *         description: Здание создано
 */
router.post("/", authMiddleware, createBuilding);

/**
 * @swagger
 * /buildings/{id}:
 *   put:
 *     summary: Обновить здание
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID здания
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Building'
 *     responses:
 *       200:
 *         description: Здание обновлено
 */
router.put("/:id", authMiddleware, updateBuilding);

/**
 * @swagger
 * /buildings/{id}:
 *   delete:
 *     summary: Удалить здание
 *     tags: [Buildings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID здания
 *     responses:
 *       200:
 *         description: Здание удалено
 */
router.delete("/:id", authMiddleware, deleteBuilding);

export default router; 