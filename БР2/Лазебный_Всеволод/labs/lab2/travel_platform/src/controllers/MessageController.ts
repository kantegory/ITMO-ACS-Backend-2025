import { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Message } from "../entities/Message";

export default class MessageController {
    async getAll(req: Request, res: Response) {
        const messages = await AppDataSource.getRepository(Message).find({
            relations: ["sender", "receiver"]
        });
        res.json(messages);
    }

    async getConversation(req: Request, res: Response) {
        const userId1 = parseInt(req.params.userId1);
        const userId2 = parseInt(req.params.userId2);
        const messages = await AppDataSource.getRepository(Message).find({
            where: [
                { sender: { id: userId1 }, receiver: { id: userId2 } },
                { sender: { id: userId2 }, receiver: { id: userId1 } }
            ],
            order: { created_at: "ASC" }
        });
        res.json(messages);
    }

    async create(req: Request, res: Response) {
        const message = AppDataSource.getRepository(Message).create(req.body);
        const results = await AppDataSource.getRepository(Message).save(message);
        res.status(201).json(results);
    }

    async markAsRead(req: Request, res: Response) {
        const message = await AppDataSource.getRepository(Message).findOneBy({
            id: parseInt(req.params.id)
        });
        if (message) {
            message.is_read = true;
            const results = await AppDataSource.getRepository(Message).save(message);
            res.json(results);
        } else {
            res.status(404).json({ message: "Message not found" });
        }
    }
}