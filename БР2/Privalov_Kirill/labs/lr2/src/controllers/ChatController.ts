import { BaseController } from './BaseController';
import ChatService from '../services/ChatService';

export const ChatController = new BaseController(ChatService.repo);

ChatController.create = async (req, res) => {
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

ChatController.getAll = async (req, res) => {
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

ChatController.getById = async (req, res) => {
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

ChatController.createMessage = async (req, res) => {
  try {
    const message = await ChatService.sendMessage(
      req.payload,
      Number(req.params.id),
      req.body.content,
    );
    res.status(201).json({
      ...message,
      sender_id: message.sender.id,
      receiver_id: message.receiver.id,
    });
  } catch (err: any) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ error: err.message || 'Internal server error' });
  }
};
