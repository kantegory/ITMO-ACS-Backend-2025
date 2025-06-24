import { Request, Response } from 'express';
import * as messageService from '../services/MessageService';

export const create = async (request: Request, response: Response) => {
    const msg = await messageService.createMessage(request.body);
    response.status(201).json(msg);
};

export const findAll = async (_: Request, response: Response) => {
    const msgs = await messageService.getAllMessages();
    response.json(msgs);
};

export const findOne = async (request: Request, response: Response) => {
    const msg = await messageService.getMessageById(+request.params.id);
    if (!msg) return response.status(404).json({ message: 'Not found' });
    response.json(msg);
};

export const update = async (request: Request, response: Response) => {
    const updated = await messageService.updateMessage(+request.params.id, request.body);
    response.json(updated);
};

export const remove = async (request: Request, response: Response) => {
    await messageService.deleteMessage(+request.params.id);
    response.status(204).send();
};