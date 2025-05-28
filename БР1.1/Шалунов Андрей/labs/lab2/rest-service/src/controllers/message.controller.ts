import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class MessageController {
    static async create(req: Request, res: Response) {
        const dto = plainToInstance(CreateMessageDto, req.body);
        await validateOrReject(dto);
        const msg = await MessageService.createMessage(dto);
        res.status(201).json(msg);
    }

    static async findAll(_: Request, res: Response) {
        const list = await MessageService.getAllMessages();
        res.json(list);
    }

    static async findOne(req: Request, res: Response) {
        const id = Number(req.params.id);
        const msg = await MessageService.getMessageById(id);
        if (!msg) {
            const err: any = new Error('Message not found');
            err.status = 404;
            throw err;
        }
        res.json(msg);
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const dto = plainToInstance(UpdateMessageDto, req.body);
        await validateOrReject(dto);
        const updated = await MessageService.updateMessage(id, dto);
        res.json(updated);
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await MessageService.deleteMessage(id);
        res.sendStatus(204);
    }
}