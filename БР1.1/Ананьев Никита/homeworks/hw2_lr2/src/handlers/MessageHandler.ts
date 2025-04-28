import { Request, Response } from 'express';
import { FindManyOptions } from 'typeorm';
import { IMessageService } from '../services/MessageService';
import { BaseHandler, HttpCodes } from './BaseHandler';
import { Message } from '../models/MessageModel';
import { MessageDto } from '../dtos/MessageDtos';


export class MessageHandler extends BaseHandler {
    private readonly service: IMessageService

    constructor(service: IMessageService){
        super()
        this.service = service
    }

    protected initRoutes(): void {
        this.router.get("/:senderId", this.getUserSentMessages.bind(this))
        this.router.get("/:receiverId", this.getUserReceivedMessages.bind(this))
        this.router.post("/", this.createMessage.bind(this))
    }

    async getUserSentMessages(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const options: FindManyOptions<Message> = {
                where: { sender : { id: Number(userId) } } 
            }
            const foundDtos = await this.service.findAll(options)
            this.success(res, { "user sent" : foundDtos}, HttpCodes.OK)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "User sent messages search failed")
        }
    }

    async getUserReceivedMessages(req: Request, res: Response) {
        const userId = req.params.userId
        try {
            const options: FindManyOptions<Message> = {
                where: { receiver : { id: Number(userId) } } 
            }
            const foundDtos = await this.service.findAll(options)
            this.success(res, { "user received" : foundDtos}, HttpCodes.OK)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "User received messages search failed")
        }
    }

    async createMessage(req: Request, res: Response) {
        try {
            const messageDto: MessageDto = await this.service.send(req.body)
            this.success(res, { "sent": messageDto }, HttpCodes.CREATED)
        } catch (error: any) {
            console.log(error)
            this.error(res, HttpCodes.INTERNAL_SERVER_ERROR, "Can't create rent")
        }
    }
}