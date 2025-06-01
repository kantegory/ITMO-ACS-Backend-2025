import bcrypt from 'bcrypt';
import { HttpError } from 'routing-controllers';
import { In, ObjectLiteral, Repository } from 'typeorm';
import dataSource from '../config/data-source';
import { Item } from '../models/Item';
import { Effect } from '../models/Effect';
import { Edge } from '../models/Edge';
import { Race } from '../models/Race';
import { Character } from '../models/Character';
import { Skill } from '../models/Skill';

export class ServicesValidator
{
    _itemRepository: Repository<ObjectLiteral>
    _effectRepository: Repository<ObjectLiteral>
    _edgeRepository: Repository<ObjectLiteral>
    _raceRepository: Repository<ObjectLiteral>
    _skillRepository: Repository<ObjectLiteral>
    constructor()
    {
        this._itemRepository = dataSource.getRepository(Item)
        this._effectRepository = dataSource.getRepository(Effect)
        this._edgeRepository = dataSource.getRepository(Edge)
        this._raceRepository = dataSource.getRepository(Race)
        this._skillRepository = dataSource.getRepository(Skill)
    }

    checkPassword(userPassword: string, password: string)
    {
        if (!bcrypt.compareSync(password, userPassword))
        {
            throw new HttpError(401, "Password or email is incorrect")
        }
    }

    async isItemExist(ids: number[])
    {
        const idsExist = await this._itemRepository.find({
                where: { id: In(ids) },
                select: ["id"]
        })

        const idsExistArr: number[] = idsExist.map(entity => entity.id)

        const allIdsExist = ids.every(id => idsExistArr.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных предметов не существуют");
        }
    }

    async isEffectExist(ids: number[])
    {
        const idsExist = await this._effectRepository.find({
            where: { id: In(ids) },
            select: ["id"]
        })

        const idsExistArr: number[] = idsExist.map(entity => entity.id)

        const allIdsExist = ids.every(id => idsExistArr.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных эффектов не существуют")
        }
    }

    async isEdgeExist(ids: number[])
    {
        const idsExist = await this._edgeRepository.find({
            where: { id: In(ids) },
            select: ["id"]
        })

        const idsExistArr: number[] = idsExist.map(entity => entity.id)

        const allIdsExist = ids.every(id => idsExistArr.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных черт не существуют")
        }
    }

    async isSkillExist(ids: number[])
    {
        const idsExist = await this._skillRepository.find({
            where: { id: In(ids) },
            select: ["id"]
        })

        const idsExistArr: number[] = idsExist.map(entity => entity.id)

        const allIdsExist = ids.every(id => idsExistArr.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных черт не существуют")
        }
    }

    async isEffectOfItem(itemId: number, ids: number[])
    {
        const item = await this._itemRepository.findOne({
            where: {
                id: itemId
            },
            relations: {
                effects: true
            }
        }) as Item
          
        const idsOfItem = item.effects.map(effect => effect.id)

        const allIdsExist = ids.every(id => idsOfItem.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных эффектов не принадлежат предмету")
        }
    }

    async isEffectOfEdge(edgeId: number, ids: number[])
    {
        const edge = await this._edgeRepository.findOne({
            where: {
                id: edgeId
            },
            relations: {
                effects: true
            }
        }) as Edge
          
        const idsOfEdge = edge.effects.map(effect => effect.id)

        const allIdsExist = ids.every(id => idsOfEdge.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных эффектов не принадлежат черте")
        }
    }

    async isEdgeOfRace(raceId: number, ids: number[])
    {
        const race = await this._raceRepository.findOne({
            where: {
                id: raceId
            },
            relations: {
                edges: true
            }
        }) as Race
          
        const idsOfEdge = race.edges.map(edge => edge.id)

        const allIdsExist = ids.every(id => idsOfEdge.includes(id));
        if (!allIdsExist)
        {
            throw new HttpError(400, "Один или несколько переданных эффектов не принадлежат черте")
        }
    }

    isCharacterAvalible(ownerId: number, char: Character)
    {
        if (ownerId != char.playerId && !char.isVisible)
        {
            throw new HttpError(403, "Запрошено изменение чужого персонажа")
        }
    }

}