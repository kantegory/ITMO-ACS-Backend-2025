import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import BaseCrudService from './BaseCrudService';
import { Condition } from '../models/Condition';
import { IConditionService } from './interfaces/IConditionService';

export class ConditionService extends BaseCrudService implements IConditionService {

    constructor()
    {
        super(Condition)
    }
}