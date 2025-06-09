import { Router } from 'express';
import {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview
} from '../controllers/reviewController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const reviewRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

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
 *               - user
 *               - route
 *               - rating
 *               - comment
 *               - date
 *             properties:
 *               user:
 *                 type: integer
 *               route:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
reviewRouter.post('/', authenticate, createReview);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *       500:
 *         description: Server error
 */
reviewRouter.get('/', getReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
reviewRouter.get('/:id', getReviewById);

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
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 *       400:
 *         description: Bad Request
 */
reviewRouter.put('/:id', authenticate, updateReview);

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
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
reviewRouter.delete('/:id', authenticate, deleteReview);

export default reviewRouter;
