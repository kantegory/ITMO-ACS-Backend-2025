import express, { Request, Response } from "express";
import { AppDataSource } from "../app-data-source";
import { Message } from "../entities/Message";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const messages = await AppDataSource.getRepository(Message).find({
        relations: ["sender", "receiver"]
    });
    res.json(messages);
});

router.get("/conversation/:userId1/:userId2", async (req: Request, res: Response) => {
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
});

    router.post("/", async (req: Request, res: Response) => {
        const message = AppDataSource.getRepository(Message).create(req.body);
        const results = await AppDataSource.getRepository(Message).save(message);
        res.status(201).json(results);
    });

    router.patch("/:id/read", async (req: Request, res: Response) => {
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
    });

    export default router;