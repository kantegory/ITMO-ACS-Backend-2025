import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Message } from "../models/Message";

const messageRepo = AppDataSource.getRepository(Message);

export const createMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const messageData = req.body;
        const message = messageRepo.create(messageData);
        const savedMessage = await messageRepo.save(message);
        res.status(201).json(savedMessage);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMessages = async (req: Request, res: Response): Promise<any> => {
    try {
        const messages = await messageRepo.find({ relations: ["user_sender", "user_receiver", "advertisement"] });
        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessageById = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const message = await messageRepo.findOne({
            where: { id },
            relations: ["user_sender", "user_receiver", "advertisement"]
        });
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const message = await messageRepo.findOne({ where: { id } });
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        const { text } = req.body;
        if (text) {
            message.text = text;
        }
        const updatedMessage = await messageRepo.save(message);
        res.json(updatedMessage);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMessage = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const result = await messageRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.json({ message: "Message deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
