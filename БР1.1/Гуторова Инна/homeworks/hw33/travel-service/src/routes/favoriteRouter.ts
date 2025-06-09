import { Router } from 'express';
import {
  createFavorite,
  getFavorites,
  getFavoriteById,
  deleteFavorite
} from '../controllers/favoriteController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const favoriteRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite management for users and routes
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a route to the user's favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - route
 *             properties:
 *               user:
 *                 type: integer
 *               route:
 *                 type: integer
 *               added_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Favorite created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
favoriteRouter.post('/', authenticate, createFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get all favorites for users
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of favorites
 *       500:
 *         description: Server error
 */
favoriteRouter.get('/', getFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get favorite by ID
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite found
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Server error
 */
favoriteRouter.get('/:id', getFavoriteById);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Delete a favorite by ID
 *     tags: [Favorites]
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
 *         description: Favorite deleted successfully
 *       404:
 *         description: Favorite not found
 *       500:
 *         description: Server error
 */
favoriteRouter.delete('/:id', authenticate, deleteFavorite);

export default favoriteRouter;
