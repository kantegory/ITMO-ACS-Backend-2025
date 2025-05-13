import { Router } from 'express';
import {
  createTravelType,
  getTravelTypes,
  getTravelTypeById,
  updateTravelType,
  deleteTravelType
} from '../controllers/travelTypeController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const travelTypeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: TravelTypes
 *   description: Travel type management
 */

/**
 * @swagger
 * /api/travel-types:
 *   post:
 *     summary: Create a new travel type (Admin only)
 *     tags: [TravelTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Экскурсионный
 *     responses:
 *       201:
 *         description: Travel type created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
travelTypeRouter.post('/', authenticate, authorizeAdmin, createTravelType);

/**
 * @swagger
 * /api/travel-types:
 *   get:
 *     summary: Get all travel types
 *     tags: [TravelTypes]
 *     responses:
 *       200:
 *         description: List of travel types
 */
travelTypeRouter.get('/', getTravelTypes);

/**
 * @swagger
 * /api/travel-types/{id}:
 *   get:
 *     summary: Get travel type by ID
 *     tags: [TravelTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Travel type found
 *       404:
 *         description: Travel type not found
 */
travelTypeRouter.get('/:id', getTravelTypeById);

/**
 * @swagger
 * /api/travel-types/{id}:
 *   put:
 *     summary: Update a travel type (Admin only)
 *     tags: [TravelTypes]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Активный
 *     responses:
 *       200:
 *         description: Travel type updated
 *       404:
 *         description: Travel type not found
 */
travelTypeRouter.put('/:id', authenticate, authorizeAdmin, updateTravelType);

/**
 * @swagger
 * /api/travel-types/{id}:
 *   delete:
 *     summary: Delete a travel type (Admin only)
 *     tags: [TravelTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Travel type deleted
 *       404:
 *         description: Travel type not found
 */
travelTypeRouter.delete('/:id', authenticate, authorizeAdmin, deleteTravelType);

export default travelTypeRouter;
