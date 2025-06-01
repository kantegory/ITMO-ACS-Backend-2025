import { Request, Response } from "express";
import messageService from "../services/messageService";
import { validateDto } from "../utils/validateDto";
import { SendMessageDto, UpdateMessageDto } from "../dto/messageDto";

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await messageService.getAllMessages(req.user?.id);
        res.json(messages);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 : 500;
        res.status(status).json({ message: error.message || "Error fetching messages" });
    }
};

export const getMessageById = async (req: Request, res: Response) => {
    try {
        const message = await messageService.getMessageById(
            Number(req.params.id),
            req.user?.id
        );
        res.json(message);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Not found" ? 404 :
            error.message === "Forbidden" ? 403 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    const dto = await validateDto(SendMessageDto, req.body, res);
    if (!dto) return;

    try {
        const message = await messageService.sendMessage(dto, req.user?.id);
        res.status(201).json(message);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(400).json({ message: error.message || "Failed to send" });
    }
};

export const getUsersDiscussions = async (req: Request, res: Response) => {
    try {
        const discussions = await messageService.getUserDiscussions(req.user?.id);
        res.json({
            discussions,
            total: Array.isArray(discussions) ? discussions.length : 0
        });
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error loading discussions" });
    }
};

export const getPropertyMessages = async (req: Request, res: Response) => {
    try {
        const messages = await messageService.getPropertyMessages(
            Number(req.params.propertyId),
            req.user?.id
        );
        res.json(messages);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Invalid property ID" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const updateMessage = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdateMessageDto, req.body, res);
    if (!dto) return;

    try {
        const message = await messageService.updateMessage(
            Number(req.params.id),
            dto,
            req.user?.id
        );
        res.json(message);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 : 400;
        res.status(status).json({ message: error.message });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        await messageService.deleteMessage(Number(req.params.id), req.user?.id);
        res.json({ message: "Message deleted successfully" });
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};