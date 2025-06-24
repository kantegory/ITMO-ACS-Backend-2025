import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial, Not } from 'typeorm';

import { ICharacterService } from './interfaces/ICharacterService';
import { EffectType } from '../models/Effect';

import axios from 'axios';

export class CharacterService implements ICharacterService
{
    API_URL: string;
    constructor()
    {
        this.API_URL = 'http://characters:3003/characters/api/characters'
    }

    async getCharacter(authToken: string, id: number): Promise<ObjectLiteral> {
        console.log(`${this.API_URL}/${id}`)
        return (await axios.get(`${this.API_URL}/${id}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        })).data
    }

    async getCharEffects(authToken: string, charId: number, type: EffectType): Promise<ObjectLiteral[]> {
        console.log(`${this.API_URL}/${charId}/effects/${type}`)
        return (await axios.get(`${this.API_URL}/${charId}/effects/${type}`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        })).data
    }

    async updateCharacter(authToken: string, id: number, updateCharacterDto: any): Promise<ObjectLiteral> {
        return (await axios.patch(`${this.API_URL}/update/${id}`, updateCharacterDto, {
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
            }
        })).data
    }
}