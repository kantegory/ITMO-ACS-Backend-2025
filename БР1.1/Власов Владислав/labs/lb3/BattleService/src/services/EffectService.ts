import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial } from 'typeorm';

import { IEffectService } from './interfaces/IEffectService';
import { Condition } from '../models/Condition';
import axios from 'axios';

export class EffectService implements IEffectService {

    API_URL: string;
    constructor()
    {
        this.API_URL = 'http://characters:3003/characters/api/effects'
    }

    async getConditions(authToken: string, effectId: number): Promise<Condition[]>
    {
        console.log(`${this.API_URL}/${effectId}/conditions`)
        return (await axios.get(`${this.API_URL}/${effectId}/conditions`, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
        })).data
    }
}