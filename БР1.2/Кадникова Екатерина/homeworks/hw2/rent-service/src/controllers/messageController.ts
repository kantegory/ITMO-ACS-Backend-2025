import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Message } from "../models/Message";
import { User } from "../models/User";
import { Property } from "../models/Property";

const messageRepo = AppDataSource.getRepository(Message);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

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

export const getAllMessages = async (_req: Request, res: Response) => {
    try {
        const messages = await messageRepo.find({ relations: ["sender", "receiver", "property"] });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching messages", error: err });
    }
};

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