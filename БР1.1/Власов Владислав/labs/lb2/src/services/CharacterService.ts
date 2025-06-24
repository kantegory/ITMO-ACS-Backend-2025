import 'reflect-metadata';
import { Repository, ObjectLiteral, EntityTarget, DeepPartial, Not } from 'typeorm';

import dataSource from '../config/data-source';
import { Character } from '../models/Character';
import { ICharacterService } from './interfaces/ICharacterService';
import { CreateCharacterDto } from '../dtos/createCharacterDto';
import { CharacterDescription } from '../models/CharacterDescription';
import { HttpError } from 'routing-controllers';
import { ServicesValidator } from '../validators/ServicesValidator';
import { Race } from '../models/Race';
import { ItemStatus, ItemToCharacter } from '../models/ItemToCharacter';
import { Effect, EffectType } from '../models/Effect';
import { Edge } from '../models/Edge';
import { Skill } from '../models/Skill';
import { EffectToCharacter } from '../models/EffectToCharacter';
import { SkillToCharacter } from '../models/SkillToCharacter';

export class CharacterService implements ICharacterService
{
    _characterRepository: Repository<ObjectLiteral>
    _descriptionRepository: Repository<ObjectLiteral>
    _raceRepository: Repository<ObjectLiteral>
    _itemToCharRepository: Repository<ObjectLiteral>
    _effectRepository: Repository<ObjectLiteral>
    _edgeRepository: Repository<ObjectLiteral>
    _skillRepository: Repository<ObjectLiteral>
    _effectToCharRepository: Repository<ObjectLiteral>
    _skillToCharRepository: Repository<ObjectLiteral>
    _validator: ServicesValidator
    constructor()
    {
        this._characterRepository = dataSource.getRepository(Character)
        this._descriptionRepository = dataSource.getRepository(CharacterDescription)
        this._raceRepository = dataSource.getRepository(Race)
        this._itemToCharRepository = dataSource.getRepository(ItemToCharacter)
        this._effectRepository = dataSource.getRepository(Effect)
        this._edgeRepository = dataSource.getRepository(Edge)
        this._skillRepository = dataSource.getRepository(Skill)
        this._effectToCharRepository = dataSource.getRepository(EffectToCharacter)
        this._skillToCharRepository = dataSource.getRepository(SkillToCharacter)
        this._validator = new ServicesValidator()
    }


    async createCharacter(createCharacter: CreateCharacterDto): Promise<ObjectLiteral> {
        const createdCharacter = this._characterRepository.create(createCharacter) as Character;
        createdCharacter.description = this._descriptionRepository.create() as CharacterDescription

        if (createdCharacter.isWildCard)
        {
            createdCharacter.hp = 3
        } else
        {
            createdCharacter.hp = 1
        }

        await this._descriptionRepository.save(createdCharacter.description);

        return await this._characterRepository.save(createdCharacter);
    }

    async getCharacter(ownerId: number, id: number): Promise<ObjectLiteral> {
        const characterDB = await this._characterRepository.findOne({
            where: { id },
            relations: {
                description: true,
                skills: { skill: true },
                edges: true,
                effects: { effect: true },
                items: { item: true }
            }
        }) as Character

        if (!characterDB)
        {
            throw new HttpError(404, 'Character not found!')
        }

        this._validator.isCharacterAvalible(ownerId, characterDB)

        return characterDB
    }

    async getMyCharacters(ownerId: number): Promise<ObjectLiteral[]> {
        const charactersDB = await this._characterRepository.find({ where: { playerId: ownerId } })
        return charactersDB
    }

    async getOtherCharacters(ownerId: number): Promise<ObjectLiteral[]> {
        const charactersDB = await this._characterRepository.find({
            where: {
                playerId: Not(ownerId),
                isVisible: true
            }
        })
        return charactersDB
    }

    async updateCharacter(ownerId: number, id: number, updateCharacterDto: any): Promise<ObjectLiteral> {
        const updatingCharacter = await this._characterRepository.findOne({
            where: { id },
            relations: ['description'],
          }) as Character

        if (!updatingCharacter)
        {
            throw new HttpError(404, 'Character not found!')
        }
        this._validator.isCharacterAvalible(ownerId, updatingCharacter)

        const { description, ...characterData } = updateCharacterDto;
        Object.assign(updatingCharacter, characterData);

        if (description) {
            Object.assign(updatingCharacter.description, description);
        }

        return await this._characterRepository.save(updatingCharacter);
    }

    async deleteCharacter(ownerId: number, id: number): Promise<ObjectLiteral> {
        const deletingCharacter = await this._characterRepository.findOneBy({ id }) as Character
        if (!deletingCharacter)
        {
            throw new HttpError(404, 'Character not found!');
        }
        this._validator.isCharacterAvalible(ownerId, deletingCharacter)

        return await this._characterRepository.delete(id);
    }

    async setRace(ownerId: number, id: number, raceId: number): Promise<void> {

        const race = await this._raceRepository.findOneBy({ id:raceId }) as Race
        if (!race)
        {
            throw new HttpError(404, 'Race not found!');
        }

        const character = await this._characterRepository.findOneBy({ id }) as Character
        if (!character)
        {
            throw new HttpError(404, 'Character not found!');
        }
        this._validator.isCharacterAvalible(ownerId, character)

        character.race = race

        await this._characterRepository.save(character);
    }

    async setVisibleStatus(ownerId: number, id: number, status: boolean): Promise<void> {
        const character = await this._characterRepository.findOneBy({ id }) as Character
        if (!character)
        {
            throw new HttpError(404, 'Character not found!');
        }

        this._validator.isCharacterAvalible(ownerId, character)

        character.isVisible = status

        await this._characterRepository.save(character);
    }

    async giveItems(ownerId: number, charId: number, itemsId: number[]): Promise<void> {
        const character = await this._characterRepository.findOneBy({ id:charId }) as Character
        this._validator.isCharacterAvalible(ownerId, character)

        this._validator.isItemExist(itemsId)

        for (const id of itemsId)
        {
            const itemByCharacter =  this._itemToCharRepository.create(
                {
                    itemId: id,
                    characterId: charId
                }
            )
            await this._itemToCharRepository.save(itemByCharacter)
        }
    }

    async changeItemStatus(ownerId: number, charId: number, itemId: number, status: ItemStatus): Promise<void> {
        const character = await this._characterRepository.findOneBy({ id:charId }) as Character
        this._validator.isCharacterAvalible(ownerId, character)
        
        const charactersItem = await this._itemToCharRepository.findOneBy({ id:itemId }) as ItemToCharacter
        console.log(itemId)
        if (!charactersItem)
        {
            throw new HttpError(404, 'ItemByCharacter not found!');
        }
    
        charactersItem.status = status

        await this._itemToCharRepository.save(charactersItem);
    }

    async giveEffects(ownerId: number, charId: number, effectsId: number[]): Promise<void> {
        const character = await this._characterRepository.findOneBy({ id:charId }) as Character
        this._validator.isCharacterAvalible(ownerId, character)
        
        this._validator.isEffectExist(effectsId)

        for (const id of effectsId)
        {
            const effectsCharacter =  this._effectToCharRepository.create(
                {
                    effectId: id,
                    characterId: charId
                }
            ) as EffectToCharacter
            await this._effectToCharRepository.save(effectsCharacter)
        }

    }

    async giveEdges(ownerId: number, charId: number, edgesId: number[]): Promise<void> {
        this._validator.isEdgeExist(edgesId)

        const character: Character = await this._characterRepository.findOne({ where : { id:charId }, relations: ['edges'] }) as Character
        if (!character)
        {
            throw new HttpError(404, 'Character not found!');
        }
        this._validator.isCharacterAvalible(ownerId, character)
        
        for (const id of edgesId)
        {
            const edge = await this._edgeRepository.findOneBy({id}) as Edge
            character.edges.push(edge)
        }

        await this._characterRepository.save(character)
    }

    async giveSkills(ownerId: number, charId: number, skillsId: number[]): Promise<void> {
        const character = await this._characterRepository.findOneBy({ id:charId }) as Character
        this._validator.isCharacterAvalible(ownerId, character)

        for (const id of skillsId)
            {
                const skillsCharacter =  this._skillToCharRepository.create(
                    {
                        skillId: id,
                        characterId: charId
                    }
                ) as SkillToCharacter
                await this._skillToCharRepository.save(skillsCharacter)
            }
    }

    async upSkill(ownerId: number, skillToCharId: number, level: number): Promise<void> {
        const skillByChar = await this._skillToCharRepository.findOne({
            where: { id:skillToCharId},
            relations: ["character"]
        }) as SkillToCharacter
        if (!skillByChar)
        {
            throw new HttpError(404, 'SkillByChar not found!');
        }
        this._validator.isCharacterAvalible(ownerId, skillByChar.character)

        skillByChar.level = level

        await this._skillToCharRepository.save(skillByChar);

    }

    async deleteItems(ownerId: number, itemsByCharId: number[]): Promise<void> {
        if (itemsByCharId.length)
        {
            const item = await this._itemToCharRepository.findOne({ 
                where: { id:itemsByCharId[0] },
                relations: { character: true }
            }) as ItemToCharacter
            this._validator.isCharacterAvalible(ownerId, item.character)
        }

        for (const itemId of itemsByCharId)
        {
            const item = await this._itemToCharRepository.findOneBy({ id:itemId }) as ItemToCharacter
            if (!item)
            {
                throw new HttpError(404, 'ItemByChar not found!')
            }

            await this._itemToCharRepository.delete(itemId)
        }
    }

    async deleteEffects(ownerId: number, effectsByCharId: number[]): Promise<void> {
        if (effectsByCharId.length)
        {
            const effect = await this._effectToCharRepository.findOne({ 
                where: { id:effectsByCharId[0] },
                relations: { character: true }
            }) as EffectToCharacter
            this._validator.isCharacterAvalible(ownerId, effect.character)
        }

        for (const effectId of effectsByCharId)
        {
            const effect = await this._effectToCharRepository.findOneBy({ id:effectId }) as ItemToCharacter
            if (!effect)
            {
                throw new HttpError(404, 'ItemByChar not found!')
            }

            await this._effectToCharRepository.delete(effectId)
        }
    }

    async deleteEdges(ownerId: number, charId: number, edgesId: number[]): Promise<void> {
        const char = await this._characterRepository.findOne({
            where: { id:charId },
            relations: ['edges'],
          }) as Character
        if (!char)
        {
            throw new HttpError(404, 'ItemByChar not found!')
        }
        this._validator.isCharacterAvalible(ownerId, char)

        char.edges = char.edges.filter((edge) => {
            return !edgesId.includes(edge.id)
        })
        
        await this._characterRepository.save(char)
    }

    async deleteSkills(ownerId: number, skillsByCharId: number[]): Promise<void> {
        if (skillsByCharId.length)
        {
            const skill = await this._skillToCharRepository.findOne({ 
                where: { id:skillsByCharId[0] },
                relations: { character: true }
            }) as SkillToCharacter
            this._validator.isCharacterAvalible(ownerId, skill.character)
        }

        for (const skillId of skillsByCharId)
        {
            const skill = await this._skillToCharRepository.findOneBy({ id:skillId }) as ItemToCharacter
            if (!skill)
            {
                throw new HttpError(404, 'ItemByChar not found!')
            }

            await this._skillToCharRepository.delete(skillId)
        }
    }

    async getCharEffects(ownerId: number, charId: number, type: EffectType): Promise<ObjectLiteral[]> {
        const character = await this._characterRepository.findOneBy({ id:charId }) as Character
        this._validator.isCharacterAvalible(ownerId, character)

        const itemEffects = await this._effectRepository
            .createQueryBuilder('effect')
            .innerJoin('item_effects_effect', 'item_effects', 'item_effects.effectId = effect.id')
            .innerJoin('item', 'item', 'item.id = item_effects.itemId')
            .innerJoin('item.characters', 'charactersItem')
            .innerJoin('charactersItem.character', 'character')
            .where('effect.type = :type', { type })
            .andWhere('character.id = :charId', { charId })
            .andWhere('charactersItem.status = :status', { status: "equipped" })
            .leftJoinAndSelect('effect.conditions', 'conditions')
            .getMany()

        const edgeEffects = await this._effectRepository
            .createQueryBuilder('effect')
            .where('effect.type = :type', { type })
            .innerJoin('edge_effects_effect', 'edge_effects', 'edge_effects.effectId = effect.id')
            .innerJoin('edge', 'edge', 'edge.id = edge_effects.edgeId')
            .innerJoin('character_edges_edge', 'character_edges', 'character_edges.edgeId = edge.id')
            .innerJoin('character', 'character', 'character.id = character_edges.characterId')
            .andWhere('character.id = :charId', { charId })
            .leftJoinAndSelect('effect.conditions', 'conditions')
            .getMany();

        const raceEdgeEffects = await this._effectRepository
            .createQueryBuilder('effect')
            .where('effect.type = :type', { type })
            .innerJoin('edge_effects_effect', 'edge_effects', 'edge_effects.effectId = effect.id')
            .innerJoin('edge', 'edge', 'edge.id = edge_effects.edgeId')
            .innerJoin('race_edges_edge', 'race_edges', 'race_edges.edgeId = edge.id')
            .innerJoin('race', 'race', 'race.id = race_edges.raceId')
            .innerJoin('character', 'character', 'character.raceId = race.id')
            .andWhere('character.id = :charId', { charId })
            .leftJoinAndSelect('effect.conditions', 'conditions')
            .getMany();

        const directEffects = await this._effectRepository
            .createQueryBuilder('effect')
            .where('effect.type = :type', { type })
            .innerJoin('effect_to_character', 'characterEffect', 'characterEffect.effectId = effect.id')
            .innerJoin('characterEffect.character', 'character')
            .andWhere('character.id = :charId', { charId })
            .leftJoinAndSelect('effect.conditions', 'conditions')
            .getMany();

        return [...itemEffects, ...edgeEffects, ...raceEdgeEffects, ...directEffects]
    }
}