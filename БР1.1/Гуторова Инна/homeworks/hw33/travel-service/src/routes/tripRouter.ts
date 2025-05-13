import { Router } from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
} from '../controllers/tripController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const tripRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management
 */

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip (Admin only)
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route
 *               - start_date
 *               - end_date
 *               - available_slots
 *               - status
 *             properties:
 *               route:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               available_slots:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Trip created successfully
 *       401:
 *         description: Unauthorized
 */
tripRouter.post('/', authenticate, authorizeAdmin, createTrip);

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: List of trips
 */
tripRouter.get('/', getTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trip found
 *       404:
 *         description: Trip not found
 */
tripRouter.get('/:id', getTripById);

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update a trip (Admin only)
 *     tags: [Trips]
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
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               available_slots:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trip updated
 *       404:
 *         description: Trip not found
 */
tripRouter.put('/:id', authenticate, authorizeAdmin, updateTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip (Admin only)
 *     tags: [Trips]
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
 *         description: Trip deleted
 *       404:
 *         description: Trip not found
 */
tripRouter.delete('/:id', authenticate, authorizeAdmin, deleteTrip);

export default tripRouter;
