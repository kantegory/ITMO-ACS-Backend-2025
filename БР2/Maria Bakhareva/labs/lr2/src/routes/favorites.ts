import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite management endpoints
 */

/**
 * @swagger
 * /api/favorites/{id}:
 *   get:
 *     summary: Get a favorite by ID
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
 *       200:
 *         description: Favorite found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 user:
 *                   type: object
 *                 property:
 *                   type: object
 *       404:
 *         description: Favorite not found
 */
router.get(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.getById,
);

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
  FavoriteController.getAll,
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
  checkOwnership('favorite', 'user'),
  FavoriteController.create,
);

/**
 * @swagger
 * /api/favorites/{id}:
 *   put:
 *     summary: Update a favorite (if needed, e.g., notes or tags)
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
 *     requestBody:
 *       description: Optional updated data
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Favorite not found
 */
router.put(
  '/:id',
  checkJwt,
  checkRole(UserRole.TENANT),
  checkOwnership('favorite', 'user'),
  FavoriteController.update,
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
  FavoriteController.delete,
);

export default router;
