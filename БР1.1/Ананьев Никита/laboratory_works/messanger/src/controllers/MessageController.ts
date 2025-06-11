import 'reflect-metadata';
import { JsonController, Get, Post, Param, Body, NotFoundError as HttpNotFound, 
        HttpCode, InternalServerError, UseBefore} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi'
import { Inject, Service } from 'typedi';
import { IMessageService } from '../services/MessageService';
import { HttpCodes } from './Codes';
import { MessageDto, DialogDto } from '../dtos/MessageDtos';
import { UserDto } from '../dtos/UserDtos';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import axios from 'axios';

const userServiceUrl = process.env.USER_SERVICE_URL ?? 'http://localhost:8001';

@JsonController('/messages')
@UseBefore(AuthMiddleware)
@Service()
export class MessageController {
    constructor(
        @Inject('IMessageService')
        private readonly service: IMessageService
    ){ }

    @Get('/:userId/dialogs')
    @OpenAPI({
        summary: 'Get dialogs of user',
        description: 'Returns list of sent and received messages, grouped by recepient',
        responses: {
            '200': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/DialogDto' }
                        }
                    }
                }
            },
            '400': {
                description: 'Bad Request'
            },
            '404': {
                description: 'User Not Found'
            },
        }
    })
    async getUserDialogs(@Param('userId') userId: number) {
        let dialogs: DialogDto[] = [];
        const recepientIds: number[] = await this.service.findReceivers(userId)
        console.log(recepientIds);
        let user: UserDto = {};

        await axios.get<UserDto>(`${userServiceUrl}/users/${userId}`
            ).then(response => {
                user = response.data
            }).catch(error => {
                if (error.response && error.response.status == 404) {
                    throw new HttpNotFound(`User with id ${userId} not found`)
                }
                throw new InternalServerError("User dialogs search failed")
            })

        for (let i = 0; i < recepientIds.length; i++) {
            const messages: MessageDto[] = await this.service.findDialog(userId, recepientIds[i])
            console.log(messages);
            let recepient: UserDto;
            try {
                const response = await axios.get<UserDto>(`${userServiceUrl}/users/${recepientIds[i]}`)
                recepient = response.data
            } catch (error: any) {
                console.log(`WARNING: recepient with id ${recepientIds[i]} not found`)
                continue
            }
            
            dialogs.push({
                sender: user, 
                receiver: recepient, 
                messages: messages,
            })
        }
        return dialogs;
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
            throw new InternalServerError("Can't send message")
        }
    }
}
