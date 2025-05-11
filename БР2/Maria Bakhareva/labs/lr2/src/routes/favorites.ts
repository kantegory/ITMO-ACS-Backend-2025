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
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite found
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
 *     summary: Get all favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of favorites
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
 *     summary: Create a new favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Favorite created
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
 *     summary: Update a favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Favorite ID
 *         schema:
 *           type: string
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
 *     summary: Delete a favorite
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Favorite ID
 *         schema:
 *           type: string
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
