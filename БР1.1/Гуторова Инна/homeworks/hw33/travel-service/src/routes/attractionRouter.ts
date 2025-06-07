import { Router } from 'express';
import {
  createAttraction,
  getAttractions,
  getAttractionById,
  updateAttraction,
  deleteAttraction
} from '../controllers/attractionController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const attractionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Attractions
 *   description: Attraction management for tourist routes
 */

/**
 * @swagger
 * /api/attractions:
 *   post:
 *     summary: Create a new attraction
 *     tags: [Attractions]
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
 *               - description
 *               - location
 *               - route
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               route:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Attraction created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
attractionRouter.post('/', authenticate, authorizeAdmin, createAttraction);

/**
 * @swagger
 * /api/attractions:
 *   get:
 *     summary: Get all attractions
 *     tags: [Attractions]
 *     responses:
 *       200:
 *         description: List of all attractions
 *       500:
 *         description: Server error
 */
attractionRouter.get('/', getAttractions);

/**
 * @swagger
 * /api/attractions/{id}:
 *   get:
 *     summary: Get an attraction by ID
 *     tags: [Attractions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attraction found
 *       404:
 *         description: Attraction not found
 *       500:
 *         description: Server error
 */
attractionRouter.get('/:id', getAttractionById);

/**
 * @swagger
 * /api/attractions/{id}:
 *   put:
 *     summary: Update an attraction
 *     tags: [Attractions]
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
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               route:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Attraction updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Attraction not found
 */
attractionRouter.put('/:id', authenticate, authorizeAdmin, updateAttraction);

/**
 * @swagger
 * /api/attractions/{id}:
 *   delete:
 *     summary: Delete an attraction by ID
 *     tags: [Attractions]
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
 *         description: Attraction deleted successfully
 *       404:
 *         description: Attraction not found
 *       500:
 *         description: Server error
 */
attractionRouter.delete('/:id', authenticate, authorizeAdmin, deleteAttraction);

export default attractionRouter;
