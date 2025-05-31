import { AppDataSource } from '../config/databaseConfig';
import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { Rental } from '../entities/Rental';
import { UserRole } from '../entities/User';
import { BaseController } from './BaseController';

export const ChatController = new BaseController(
  AppDataSource.getRepository(Chat),
);

ChatController.create = async (req, res) => {
  try {
    const user = req.payload;
    if (!user || user.role !== 'tenant') {
      res.status(403).json({ error: 'Only tenants can start a chat' });
      return;
    }

    if (req.body === undefined) {
      res.status(400).json({ error: 'Request body is required' });
      return;
    }
    const { rentalId } = req.body;
    if (!rentalId) {
      res.status(400).json({ error: 'rentalId is required' });
      return;
    }

    const rentalRepo = AppDataSource.getRepository(Rental);
    const rental = await rentalRepo.findOne({
      where: { id: rentalId },
      relations: ['tenant', 'landlord'],
    });
    if (!rental || rental.tenant.id !== user.userId) {
      res.status(403).json({ error: 'You are not the tenant of this rental' });
      return;
    }

    const chatRepo = AppDataSource.getRepository(Chat);
    let chat = await chatRepo.findOne({ where: { rental: { id: rentalId } } });
    if (chat) {
      res.status(200).json(chat);
      return;
    }

    chat = chatRepo.create({ rental });
    await chatRepo.save(chat);

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error in create chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

ChatController.getById = async (req, res) => {
  try {
    const user = req.payload;
    const chatId = req.params.id;

    if (!user) {
      res.status(403).json({ error: 'User not authenticated' });
      return;
    }

    const chatRepo = AppDataSource.getRepository(Chat);
    const chat = await chatRepo.findOne({
      where: { id: Number(chatId) },
      relations: [
        'messages',
        'rental',
        'rental.tenant',
        'rental.property',
        'rental.property.owner',
      ],
    });

    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    if (user.role === UserRole.ADMIN) {
      res.status(200).json(chat);
      return;
    }

    if (
      (user.role === UserRole.TENANT &&
        chat.rental.tenant.id === user.userId) ||
      (user.role === UserRole.LANDLORD &&
        chat.rental.property.owner.id === user.userId)
    ) {
      res.status(200).json(chat);
      return;
    }

    res.status(403).json({ error: 'Access denied' });
  } catch (error) {
    console.error('Error in getById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

ChatController.createMessage = async (req, res) => {
  try {
    const user = req.payload;
    const chatId = req.params.id;
    const { message } = req.body;

    if (!user) {
      res.status(403).json({ error: 'User not authenticated' });
      return;
    }

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const chatRepo = AppDataSource.getRepository(Chat);
    const chat = await chatRepo.findOne({
      where: { id: Number(chatId) },
      relations: [
        'messages',
        'rental',
        'rental.tenant',
        'rental.property',
        'rental.property.owner',
      ],
    });

    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return;
    }

    let receiver;
    if (user.role === 'tenant' && chat.rental.tenant.id === user.userId) {
      receiver = chat.rental.property.owner;
    } else if (
      user.role === 'landlord' &&
      chat.rental.property.owner.id === user.userId
    ) {
      receiver = chat.rental.tenant;
    } else {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    const messageRepo = AppDataSource.getRepository(Message);
    const newMessage = messageRepo.create({
      sender: user,
      receiver,
      rental: chat.rental,
      message,
      chat,
    });
    await messageRepo.save(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error in createMessage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
