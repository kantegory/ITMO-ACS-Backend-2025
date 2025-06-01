import { BaseController } from './BaseController';
import { Chat } from '../entities/Chat';
import ChatService from '../services/ChatService';
import { Request, Response } from 'express';

export class ChatController extends BaseController<Chat> {
  constructor() {
    super(ChatService.repo);
  }

  create = async (req: Request, res: Response) => {
    try {
      const { chat, isNew } = await ChatService.startChat(
        req.payload,
        req.body.propertyId,
      );
      res.status(isNew ? 201 : 200).json(chat);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal server error' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const chats = await ChatService.getAllChats(req.payload);
      res.status(200).json(chats);
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const chat = await ChatService.getChatById(
        req.payload,
        Number(req.params.id),
      );
      res.status(200).json(chat);
    } catch (err: any) {
      console.error(err);
      const status = err.status || (err.message === 'Chat not found' ? 404 : 500);
      res.status(status).json({ error: err.message || 'Internal server error' });
    }
  };

  createMessage = async (req: Request, res: Response) => {
    try {
      const message = await ChatService.sendMessage(
        req.payload,
        Number(req.params.id),
        req.body.content,
      );
      res.status(201).json({
        ...message,
        sender_id: message.senderId,
        receiver_id: message.receiverId,
      });
    } catch (err: any) {
      console.error(err);
      res
        .status(err.status || 500)
        .json({ error: err.message || 'Internal server error' });
    }
  };
}