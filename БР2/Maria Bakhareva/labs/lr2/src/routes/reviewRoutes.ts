import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { checkJwt, checkOwnership } from '../middleware/checkJwt';

const router = Router();

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
router.get('/', checkJwt, ReviewController.getAll);

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
router.get('/:id', checkJwt, ReviewController.getById);

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
router.post('/', checkJwt, ReviewController.create);

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
router.put(
  '/:id',
  checkJwt,
  checkOwnership('review', 'author_id'),
  ReviewController.update
);

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
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('review', 'author_id'),
  ReviewController.delete
);

export default router;
