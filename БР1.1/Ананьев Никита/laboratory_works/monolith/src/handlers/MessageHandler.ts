import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body, NotFoundError as HttpNotFound, 
        HttpCode, InternalServerError} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { FindManyOptions } from 'typeorm';
import { IMessageService } from '../services/MessageService';
import { HttpCodes } from './Codes';
import { Message } from '../models/MessageModel';
import { MessageDto } from '../dtos/MessageDtos';


@JsonController('/messages')
@Service()
export class MessageHandler {
    constructor(
        @Inject('IMessageService')
        private readonly service: IMessageService
    ) {}


    @Get('/:userId/sent')
    @OpenAPI({
        summary: 'Get messages sent by userId',
        description: 'Returns rent list of user messages',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/MessageDto' }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async getUserSentMessages(@Param('userId') userId: number) {
        try {
            const options: FindManyOptions<Message> = {
                where: { sender : { id: Number(userId) } },
                relations: ["sender", "receiver"]
            }
            return await this.service.findAll(options)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("User sent messages search failed")
        }
    }

    @Get('/:userId/received')
    @OpenAPI({
        summary: 'Get messages received by userId',
        description: 'Returns rent list of user received messages',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/MessageDto' }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async getUserReceivedMessages(@Param('userId') userId: number) {
        try {
            const options: FindManyOptions<Message> = {
                where: { receiver : { id: Number(userId) } },
                relations: ["sender", "receiver"],
            }
            return await this.service.findAll(options)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("User received messages search failed")
        }
    }
    
    @HttpCode(HttpCodes.CREATED)
    @Post()
    @OpenAPI({
        summary: 'Create message',
        description: 'Send new message from one user to another',
        requestBody: {
            content: {
                'application/json': { schema: {$ref: "#/components/schemas/MessageDto"}}
            },
        },
        responses: {
            '201': {
                description: 'Created',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/MessageDto' }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
        }
    })
    async createMessage(@Body() newMessage: MessageDto) {
        try {
            return await this.service.send(newMessage)
        } catch (error: any) {
            console.log(error)
            throw new InternalServerError("Can't create rent")
        }
    }
}