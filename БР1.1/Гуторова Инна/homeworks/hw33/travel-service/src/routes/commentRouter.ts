import { Router } from 'express';
import {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment
} from '../controllers/commentController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const commentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management for routes and users
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
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
 *               - comment_text
 *               - date
 *             properties:
 *               user:
 *                 type: integer
 *               route:
 *                 type: integer
 *               comment_text:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
commentRouter.post('/', authenticate, createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Server error
 */
commentRouter.get('/', getComments);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
commentRouter.get('/:id', getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
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
 *               comment_text:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Comment not found
 */
commentRouter.put('/:id', authenticate, updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
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
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
commentRouter.delete('/:id', authenticate, deleteComment);

export default commentRouter;
