"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Chat_1 = require("../entities/Chat");
const Message_1 = require("../entities/Message");
const Rental_1 = require("../entities/Rental");
const User_1 = require("../entities/User");
const BaseController_1 = require("./BaseController");
exports.ChatController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(Chat_1.Chat));
exports.ChatController.create = async (req, res) => {
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
        const rentalRepo = databaseConfig_1.AppDataSource.getRepository(Rental_1.Rental);
        const rental = await rentalRepo.findOne({
            where: { id: rentalId },
            relations: ['tenant', 'landlord'],
        });
        if (!rental || rental.tenant.id !== user.userId) {
            res.status(403).json({ error: 'You are not the tenant of this rental' });
            return;
        }
        const chatRepo = databaseConfig_1.AppDataSource.getRepository(Chat_1.Chat);
        let chat = await chatRepo.findOne({ where: { rental: { id: rentalId } } });
        if (chat) {
            res.status(200).json(chat);
            return;
        }
        chat = chatRepo.create({ rental });
        await chatRepo.save(chat);
        res.status(201).json(chat);
    }
    catch (error) {
        console.error('Error in create chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.ChatController.getById = async (req, res) => {
    try {
        const user = req.payload;
        const chatId = req.params.id;
        if (!user) {
            res.status(403).json({ error: 'User not authenticated' });
            return;
        }
        const chatRepo = databaseConfig_1.AppDataSource.getRepository(Chat_1.Chat);
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
        if (user.role === User_1.UserRole.ADMIN) {
            res.status(200).json(chat);
            return;
        }
        if ((user.role === User_1.UserRole.TENANT &&
            chat.rental.tenant.id === user.userId) ||
            (user.role === User_1.UserRole.LANDLORD &&
                chat.rental.property.owner.id === user.userId)) {
            res.status(200).json(chat);
            return;
        }
        res.status(403).json({ error: 'Access denied' });
    }
    catch (error) {
        console.error('Error in getById:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.ChatController.createMessage = async (req, res) => {
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
        const chatRepo = databaseConfig_1.AppDataSource.getRepository(Chat_1.Chat);
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
        }
        else if (user.role === 'landlord' &&
            chat.rental.property.owner.id === user.userId) {
            receiver = chat.rental.tenant;
        }
        else {
            res.status(403).json({ error: 'Access denied' });
            return;
        }
        const messageRepo = databaseConfig_1.AppDataSource.getRepository(Message_1.Message);
        const newMessage = messageRepo.create({
            sender: user,
            receiver,
            rental: chat.rental,
            message,
            chat,
        });
        await messageRepo.save(newMessage);
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.error('Error in createMessage:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
