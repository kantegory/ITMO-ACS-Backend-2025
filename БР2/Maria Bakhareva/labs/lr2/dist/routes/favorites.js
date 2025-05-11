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
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite found
 *       404:
 *         description: Favorite not found
 */
router.get('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.getById);
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
router.get('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), FavoriteController_1.FavoriteController.getAll);
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
router.post('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.create);
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
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.update);
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
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), (0, checkJwt_1.checkOwnership)('favorite', 'user'), FavoriteController_1.FavoriteController.delete);
exports.default = router;
