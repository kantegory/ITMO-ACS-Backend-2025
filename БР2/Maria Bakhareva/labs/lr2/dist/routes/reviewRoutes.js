"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = require("../controllers/ReviewController");
const checkJwt_1 = require("../middleware/checkJwt");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management endpoints
 */
/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews
 *       401:
 *         description: Unauthorized
 */
router.get('/', checkJwt_1.checkJwt, ReviewController_1.ReviewController.getAll);
/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', checkJwt_1.checkJwt, ReviewController_1.ReviewController.getById);
/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - rating
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 description: Rating of the review (1-5 scale)
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Bad request or validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', checkJwt_1.checkJwt, ReviewController_1.ReviewController.create);
/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 description: Updated rating (1-5 scale)
 *     responses:
 *       200:
 *         description: Review updated
 *       403:
 *         description: Forbidden (Not the review author)
 *       404:
 *         description: Review not found
 */
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('review', 'author_id'), ReviewController_1.ReviewController.update);
/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Review deleted
 *       403:
 *         description: Forbidden (Not the review author)
 *       404:
 *         description: Review not found
 */
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('review', 'author_id'), ReviewController_1.ReviewController.delete);
exports.default = router;
