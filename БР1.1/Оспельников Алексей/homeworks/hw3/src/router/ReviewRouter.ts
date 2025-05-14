import { Router } from "express";
import { ReviewController } from "../controller/ReviewController";

const reviewRouter = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the review.
 *         rent:
 *           type: integer
 *           description: The ID of the rent associated with the review.
 *         grade:
 *           type: number
 *           format: decimal
 *           description: The grade given in the review.
 *         text:
 *           type: string
 *           description: The text content of the review.
 *         complaints:
 *           type: string
 *           description: Any complaints mentioned in the review.
 */

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Operations related to reviews
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Retrieve a list of all reviews
 *     description: Retrieve a list of all reviews from the database.
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Internal server error.
 */
reviewRouter.get("/reviews", ReviewController.all);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review in the database.
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
reviewRouter.post("/reviews", ReviewController.create);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Retrieve a specific review by ID
 *     description: Retrieve a specific review from the database.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
reviewRouter.get("/reviews/:id", ReviewController.findOne);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update an existing review by ID
 *     description: Update an existing review in the database.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
reviewRouter.put("/reviews/:id", ReviewController.update);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     description: Delete a review from the database.
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the review to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Review deleted successfully (no content).
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
reviewRouter.delete("/reviews/:id", ReviewController.delete);
export default reviewRouter;