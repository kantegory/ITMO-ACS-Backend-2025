import { Request, Response } from "express";
import * as messageService from "../services/messageService";

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class MessageController {
    postMessage = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { receiverId, advertisementId, text } = req.body;

        if (!receiverId || !advertisementId || !text) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            const message = await messageService.createMessage(
                req.user.id,
                Number(receiverId),
                Number(advertisementId),
                text
            );
            res.status(201).json(message);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    fetchUserMessages = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const messages = await messageService.getMessagesByUser(req.user.id);
            res.json(messages);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default new MessageController();
