import 'reflect-metadata';
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import { Message } from '../models/Message';
import { IMessageService } from './interfaces/IMessageService';
import { ChatEventType, ChatHistory } from '../models/ChatHistory';
import { CreateChatHistoryDto } from '../dtos/createChatHistoryDto';
import { HttpError } from 'routing-controllers';
import { CreateMessageDto } from '../dtos/createMessageDto';

export class MessageService implements IMessageService {

    _repository: Repository<ObjectLiteral>
    _chatHistoryRepository: Repository<ObjectLiteral>
    constructor()
    {
        this._repository = dataSource.getRepository(Message)
        this._chatHistoryRepository = dataSource.getRepository(ChatHistory)
    }

    async post(authorId: number, entity: DeepPartial<CreateMessageDto>)
    {
        const createdMessage = this._repository.create(entity) as Message;
        createdMessage.authorId = authorId
        const message = await this._repository.save(createdMessage);

        const chatHisoryDto = new CreateChatHistoryDto()
        chatHisoryDto.message = message
        chatHisoryDto.eventType = ChatEventType.MESSAGE
        const createdHistory = this._chatHistoryRepository.create(chatHisoryDto);
        await this._chatHistoryRepository.save(createdHistory)

        return message
    };

    async getAll()
    {
        return this._repository.find()
    };

    async get(id: number)
    {   
        const entity_db = await this._repository.findOneBy({ id })
        if (!entity_db)
        {
            throw new HttpError(404, `${this._repository.metadata.name} not found!`);
        }

        return entity_db
    };
}