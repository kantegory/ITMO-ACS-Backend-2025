import { Router } from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute
} from '../controllers/routeController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const routeRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management
 */

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Create a new route (Admin only)
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - duration
 *               - travel_type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               duration:
 *                 type: string
 *               travel_type:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Route created successfully
 *       401:
 *         description: Unauthorized
 */
routeRouter.post('/', authenticate, authorizeAdmin, createRoute);

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: List of routes
 */
routeRouter.get('/', getRoutes);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route found
 *       404:
 *         description: Route not found
 */
routeRouter.get('/:id', getRouteById);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route (Admin only)
 *     tags: [Routes]
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               duration:
 *                 type: string
 *               travel_type:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Route updated
 *       404:
 *         description: Route not found
 */
routeRouter.put('/:id', authenticate, authorizeAdmin, updateRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete a route (Admin only)
 *     tags: [Routes]
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
 *         description: Route deleted
 *       404:
 *         description: Route not found
 */
routeRouter.delete('/:id', authenticate, authorizeAdmin, deleteRoute);

export default routeRouter;
