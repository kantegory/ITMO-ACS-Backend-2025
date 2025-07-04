import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/UserRole';

const router = Router();
const favoritesController = new FavoriteController();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite management endpoints
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get all favorites for current user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user:
 *                     type: object
 *                   property:
 *                     type: object
 */
router.get(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  favoritesController.getAll,
);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a property to favorites
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
 *               - propertyId
 *             properties:
 *               propertyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Favorite created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 property:
 *                   type: object
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  favoritesController.create,
);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove a property from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Favorite ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Favorite deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Favorite not found
 */
router.delete(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  favoritesController.delete,
);

export default router;
