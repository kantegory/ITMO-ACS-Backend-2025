/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Управление квартирами
 */

import { Router } from "express";
import { 
  getAllApartments, 
  getApartmentById, 
  createApartment, 
  updateApartment, 
  deleteApartment 
} from "../controllers/apartmentController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /apartments:
 *   get:
 *     summary: Получить все квартиры
 *     tags: [Apartments]
 *     responses:
 *       200:
 *         description: Список квартир
 */
router.get("/", getAllApartments);

/**
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Получить квартиру по ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID квартиры
 *     responses:
 *       200:
 *         description: Данные квартиры
 *       404:
 *         description: Квартира не найдена
 */
router.get("/:id", getApartmentById);

/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Создать квартиру
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Number
 *               - Square
 *               - Cost
 *             properties:
 *               Number:
 *                 type: integer
 *                 description: Номер квартиры
 *               Square:
 *                 type: integer
 *                 description: Площадь квартиры в кв.м
 *               Description:
 *                 type: string
 *                 description: Описание квартиры
 *               Photo:
 *                 type: string
 *                 description: URL фотографии квартиры
 *               Cost:
 *                 type: integer
 *                 description: Стоимость квартиры
 *               BuildingID:
 *                 type: integer
 *                 description: ID здания, в котором находится квартира
 *           example:
 *             Number: 15
 *             Square: 75
 *             Description: "Уютная 2-комнатная квартира с ремонтом"
 *             Photo: "/uploads/apartment1.jpg"
 *             Cost: 5000000
 *             BuildingID: 1
 *     responses:
 *       201:
 *         description: Квартира создана
 *       400:
 *         description: Ошибка валидации или здание не найдено
 *         content:
 *           application/json:
 *             example:
 *               message: "Building not found"
 *               error: "Building with ID 999 does not exist"
 */
router.post("/", authMiddleware, createApartment);

/**
 * @swagger
 * /apartments/{id}:
 *   put:
 *     summary: Обновить квартиру
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID квартиры
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       200:
 *         description: Квартира обновлена
 */
router.put("/:id", authMiddleware, updateApartment);

/**
 * @swagger
 * /apartments/{id}:
 *   delete:
 *     summary: Удалить квартиру
 *     tags: [Apartments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID квартиры
 *     responses:
 *       200:
 *         description: Квартира удалена
 */
router.delete("/:id", authMiddleware, deleteApartment);

export default router; 