"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validatorChat_1 = require("./../middleware/validator/validatorChat");
const express_1 = require("express");
const checkJwt_1 = require("../middleware/checkJwt");
const ChatController_1 = require("../controllers/ChatController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management and messaging
 */
/**
 * @swagger
 * /api/chat/{id}:
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
router.get('/:id', checkJwt_1.checkJwt, ChatController_1.ChatController.getById);
/**
 * @swagger
 * /api/chat:
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
 *               - rentalId
 *             properties:
 *               rentalId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Chat created
 *       400:
 *         description: Validation error
 */
router.post('/', checkJwt_1.checkJwt, validatorChat_1.validatorCreateChat, ChatController_1.ChatController.create);
/**
 * @swagger
 * /api/chat/{id}/message:
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
router.post('/:id/message', checkJwt_1.checkJwt, validatorChat_1.validatorCreateMessage, ChatController_1.ChatController.createMessage);
exports.default = router;
