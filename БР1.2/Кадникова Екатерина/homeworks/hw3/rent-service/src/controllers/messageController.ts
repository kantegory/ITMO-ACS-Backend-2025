/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messaging system between users
 *
 * components:
 *   schemas:
 *     MessageBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           example: "Is this property still available?"
 *         sent_at:
 *           type: string
 *           format: date-time
 *
 *     MessageWithRelations:
 *       allOf:
 *         - $ref: '#/components/schemas/MessageBase'
 *         - type: object
 *           properties:
 *             sender:
 *               $ref: '#/components/schemas/User'
 *             receiver:
 *               $ref: '#/components/schemas/User'
 *             property:
 *               $ref: '#/components/schemas/Property'
 *
 *     MessageCreate:
 *       type: object
 *       required:
 *         - senderId
 *         - receiverId
 *         - propertyId
 *         - content
 *       properties:
 *         senderId:
 *           type: integer
 *           example: 1
 *         receiverId:
 *           type: integer
 *           example: 2
 *         propertyId:
 *           type: integer
 *           example: 5
 *         content:
 *           type: string
 *           minLength: 1
 *           maxLength: 1000
 *           example: "Hello, I'm interested in your property"
 *
 *     MessageUpdate:
 *       type: object
 *       required:
 *         - senderId
 *         - content
 *       properties:
 *         senderId:
 *           type: integer
 *           example: 1
 *         content:
 *           type: string
 *           minLength: 1
 *           maxLength: 1000
 *           example: "Updated message content"
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Message deleted"
 */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { Property } from "../models/Property";

const messageRepo = AppDataSource.getRepository(Message);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageCreate'
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageWithRelations'
 *       404:
 *         description: Sender, receiver or property not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, propertyId, content } = req.body;

        const sender = await userRepo.findOneBy({ id: senderId });
        const receiver = await userRepo.findOneBy({ id: receiverId });
        const property = await propertyRepo.findOneBy({ id: propertyId });

        if (!sender || !receiver || !property) {
            return res.status(404).json({ message: "Sender, receiver, or property not found" });
        }

        const message = messageRepo.create({
            sender,
            receiver,
            property,
            content,
        });

        await messageRepo.save(message);
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: "Error sending message", error: err });
    }
};

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of all messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllMessages = async (_req: Request, res: Response) => {
    try {
        const messages = await messageRepo.find({ relations: ["sender", "receiver", "property"] });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching messages", error: err });
    }
};

/**
 * @swagger
 * /messages/conversation:
 *   get:
 *     summary: Get conversation between two users
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: user1Id
 *         schema:
 *           type: integer
 *         required: true
 *         description: First user ID
 *       - in: query
 *         name: user2Id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Second user ID
 *       - in: query
 *         name: propertyId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Optional property ID to filter by
 *     responses:
 *       200:
 *         description: List of messages between users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MessageWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getMessagesBetweenUsers = async (req: Request, res: Response) => {
    try {
        const { user1Id, user2Id, propertyId } = req.query;

        const query = messageRepo
            .createQueryBuilder("message")
            .leftJoinAndSelect("message.sender", "sender")
            .leftJoinAndSelect("message.receiver", "receiver")
            .leftJoinAndSelect("message.property", "property")
            .where(
                "(sender.id = :user1 AND receiver.id = :user2) OR (sender.id = :user2 AND receiver.id = :user1)",
                { user1: user1Id, user2: user2Id }
            );

        if (propertyId) {
            query.andWhere("property.id = :propertyId", { propertyId });
        }

        const messages = await query.getMany();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching conversation", error: err });
    }
};

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageUpdate'
 *     responses:
 *       200:
 *         description: Message updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageWithRelations'
 *       403:
 *         description: Forbidden (can only edit your own messages)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const updateMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { senderId, content } = req.body;

        const message = await messageRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["sender"],
        });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (message.sender.id !== senderId) {
            return res.status(403).json({ message: "You can only edit your own messages" });
        }

        message.content = content;

        const updated = await messageRepo.save(message);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating message", error: err });
    }
};

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       404:
 *         description: Message not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await messageRepo.findOneBy({ id: parseInt(id) });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        await messageRepo.remove(message);
        res.json({ message: "Message deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting message", error: err });
    }
};