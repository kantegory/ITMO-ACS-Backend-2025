import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import dataSource from '../config/data-source';
import BaseCrudService from './BaseCrudService';
import { Skill } from '../models/Skill';
import { ISkillService } from './interfaces/ISkillService';

export class SkillService extends BaseCrudService implements ISkillService {

    constructor()
    {
        super(Skill)
    }
}