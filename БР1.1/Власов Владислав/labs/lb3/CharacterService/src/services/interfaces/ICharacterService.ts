import { ObjectLiteral } from "typeorm";
import { CreateCharacterDto } from "../../dtos/createCharacterDto";
import { UpdateCharacterDto } from "../../dtos/updateCharacterDto";
import { ItemStatus } from "../../models/ItemToCharacter";
import { EffectType } from "../../models/Effect";

export interface ICharacterService
{
    createCharacter(createCharacter: CreateCharacterDto): Promise<ObjectLiteral>

    getCharacter(ownerId: number, id: number): Promise<ObjectLiteral>
    
    getMyCharacters(ownerId: number): Promise<ObjectLiteral[]>
    getOtherCharacters(ownerId: number): Promise<ObjectLiteral[]>

    updateCharacter(ownerId: number, id: number, updateCharacterDto: UpdateCharacterDto): Promise<ObjectLiteral>
    deleteCharacter(ownerId: number, id: number): Promise<ObjectLiteral>

    setRace(ownerId: number, id: number, raceId: number): Promise<void>
    setVisibleStatus(ownerId: number, id: number, status: boolean): Promise<void>

    changeItemStatus(ownerId: number, charId: number, itemId: number, status: ItemStatus): Promise<void>

    giveItems(ownerId: number, charId: number, itemsId: number[]): Promise<void>
    giveEffects(ownerId: number, charId: number, effectsId: number[]): Promise<void>
    giveEdges(ownerId: number, charId: number, edgesId: number[]): Promise<void>
    giveSkills(ownerId: number, charId: number, skillsId: number[]): Promise<void>

    upSkill(ownerId: number, skillToCharId: number, level: number): Promise<void>

    deleteItems(ownerId: number, itemsByCharId: number[]): Promise<void>
    deleteEffects(ownerId: number, effectsByCharId: number[]): Promise<void>
    deleteEdges(ownerId: number, charId: number, edgesId: number[]): Promise<void>
    deleteSkills(ownerId: number, skillsByCharId: number[]): Promise<void>

    getCharEffects(ownerId: number, charId: number, type: EffectType): Promise<ObjectLiteral[]>
}