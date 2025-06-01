import {
  validatorCreateChat,
  validatorCreateMessage,
} from '../middleware/validator/validatorChat';
import { Router } from 'express';
import { checkJwt } from '../middleware/checkJwt';
import { ChatController } from '../controllers/ChatController';

const router = Router();
const chatController = new ChatController();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management and messaging
 */

/**
 * @swagger
 * /api/chats/{id}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chat ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat retrieved successfully
 *       404:
 *         description: Chat not found
 */
router.get('/:id', checkJwt, chatController.getById);

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chat]
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
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Chat created
 *       400:
 *         description: Validation error
 */
router.post('/', checkJwt, validatorCreateChat, chatController.create);

/**
 * @swagger
 * /api/chats/{id}/message:
 *   post:
 *     summary: Send a message to a chat
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chat ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       201:
 *         description: Message sent
 *       400:
 *         description: Validation error
 *       404:
 *         description: Chat not found
 */
router.post(
  '/:id/message',
  checkJwt,
  validatorCreateMessage,
  chatController.createMessage,
);

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chats
 */
router.get('/', checkJwt, chatController.getAll);

export default router;
