import 'reflect-metadata';
import { Repository, ObjectLiteral } from 'typeorm';

import dataSource from '../config/data-source';
import { ChatHistory } from '../models/ChatHistory';
import { IChatHistoryService } from './interfaces/IChatHistoryService';

export class ChatHistoryService implements IChatHistoryService {

    _repository: Repository<ObjectLiteral>
    constructor()
    {
        this._repository = dataSource.getRepository(ChatHistory)
    }

    async getAll()
    {
        return this._repository.find()
    };

}