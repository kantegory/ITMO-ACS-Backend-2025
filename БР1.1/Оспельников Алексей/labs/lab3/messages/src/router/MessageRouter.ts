import { Router } from "express";
import { MessageController } from "../controller/MessageController";

const messageRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Operations related to messages
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the message.
 *         theme:
 *           type: string
 *           description: The theme or subject of the message.
 *         text:
 *           type: string
 *           description: The content of the message.
 *         recipient_id:
 *           type: integer
 *           description: The ID of the recipient User.
 *         sender_id:
 *           type: integer
 *           description: The ID of the sender User.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time the message was created.
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Retrieve a list of all messages
 *     description: Retrieve a list of all messages from the database.
 *     tags: [Message]
 *     responses:
 *       200:
 *         description: A list of messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error.
 */
messageRouter.get("/messages", MessageController.all);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message in the database.
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
messageRouter.post("/messages", MessageController.create);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Retrieve a specific message by ID
 *     description: Retrieve a specific message from the database.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
messageRouter.get("/messages/:id", MessageController.findOne);

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get chat history
 *     description: Retrieve a chat history of 2 users
 *     tags: [Message]
 *     parameters:
 *       - in: query
 *         name: first_id
 *         required: true
 *         description: The ID of the first user.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: second_id
 *         required: true
 *         description: The ID of the second user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */

messageRouter.get("/history", MessageController.getChatHistory);
/**
 * @swagger
 * /api/messages/{id}:
 *   put:
 *     summary: Update an existing message by ID
 *     description: Update an existing message in the database.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Message updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
messageRouter.put("/messages/:id", MessageController.update);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Delete a message from the database.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Message deleted successfully (no content).
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
messageRouter.delete("/messages/:id", MessageController.delete);

export default messageRouter;