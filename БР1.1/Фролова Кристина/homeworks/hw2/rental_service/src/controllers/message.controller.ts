import {RequestHandler} from 'express';
import messageService from '../services/message.service';

class MessageController {
    getById: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const message = await messageService.getById(id);
            res.status(200).json(message);
        } catch (err) {
            next(err);
        }
    };

    getForAdvertisement: RequestHandler = async (req, res, next) => {
        try {
            const adId = parseInt(req.params.adId);
            const messages = await messageService.getMessagesForAdvertisement(adId);
            res.status(200).json(messages);
        } catch (err) {
            next(err);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { senderId, receiverId, advertisementId, text } = req.body;
            const message = await messageService.create({ senderId, receiverId, advertisementId, text });
            res.status(201).json(message);
        } catch (err) {
            next(err);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await messageService.delete(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };
}

export default new MessageController();
