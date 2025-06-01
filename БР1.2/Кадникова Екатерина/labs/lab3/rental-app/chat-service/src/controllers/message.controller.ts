import { Request, Response } from "express";
import messageService from "../services/message.service";
import { validateDto } from "../utils/validate.util";
import { SendMessageDto, UpdateMessageDto } from "../dto/message.dto";
import authClient from "../services/auth.client";

export class MessageController {
    async getAllMessages(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const messages = await messageService.getAllMessages(user.id, req);
            res.json(messages);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async getMessageById(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const message = await messageService.getMessageById(
                Number(req.params.id),
                user.id,
                req
            );
            res.json(message);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Message not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async sendMessage(req: Request, res: Response) {
        const dto = await validateDto(SendMessageDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const message = await messageService.sendMessage(dto, user.id, req);
            res.status(201).json(message);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserDiscussions(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const discussions = await messageService.getUserDiscussions(user.id, req);
            res.json({
                discussions,
                total: discussions.length
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPropertyMessages(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const messages = await messageService.getPropertyMessages(
                Number(req.params.propertyId),
                user.id,
                req
            );
            res.json(messages);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async updateMessage(req: Request, res: Response) {
        const dto = await validateDto(UpdateMessageDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const message = await messageService.updateMessage(
                Number(req.params.id),
                dto,
                user.id,
                req
            );
            res.json(message);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 : 400;
            res.status(status).json({ message: error.message });
        }
    }

    async deleteMessage(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            await messageService.deleteMessage(
                Number(req.params.id),
                user.id,
                req
            );
            res.json({ message: "Message deleted successfully" });
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Message not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }
}

export default new MessageController();