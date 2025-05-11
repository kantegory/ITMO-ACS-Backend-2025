"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FavoriteController_1 = require("../controllers/FavoriteController");
const checkJwt_1 = require("../middleware/checkJwt");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
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
router.get('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.getById);
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
router.get('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), FavoriteController_1.FavoriteController.getAll);
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
router.post('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.create);
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
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.update);
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
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.delete);
exports.default = router;
