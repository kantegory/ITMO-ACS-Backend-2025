import { Router } from 'express';
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
} from '../controllers/mediaController';
import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/authAdm";

const mediaRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management for routes and attractions
 */

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Create a new media entry
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - route
 *               - attraction
 *               - type
 *               - url
 *             properties:
 *               route:
 *                 type: integer
 *               attraction:
 *                 type: integer
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Media created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */
mediaRouter.post('/', authenticate, authorizeAdmin, createMedia);

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Get all media entries
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of media entries
 *       500:
 *         description: Server error
 */
mediaRouter.get('/', getMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Get media entry by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Media entry found
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
mediaRouter.get('/:id', getMediaById);

/**
 * @swagger
 * /api/media/{id}:
 *   put:
 *     summary: Update a media entry
 *     tags: [Media]
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
 *               route:
 *                 type: integer
 *               attraction:
 *                 type: integer
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Media updated successfully
 *       404:
 *         description: Media not found
 *       400:
 *         description: Bad Request
 */
mediaRouter.put('/:id', authenticate, authorizeAdmin, updateMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: Delete a media entry
 *     tags: [Media]
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
 *         description: Media deleted successfully
 *       404:
 *         description: Media not found
 *       500:
 *         description: Server error
 */
mediaRouter.delete('/:id', authenticate, authorizeAdmin, deleteMedia);

export default mediaRouter;
