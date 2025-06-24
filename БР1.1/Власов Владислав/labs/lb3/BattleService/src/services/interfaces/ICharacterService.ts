import { ObjectLiteral } from "typeorm";
import { EffectType } from "../../models/Effect";

export interface ICharacterService
{
    getCharacter(authToken: string, id: number): Promise<ObjectLiteral>
    getCharEffects(authToken: string, charId: number, type: EffectType): Promise<ObjectLiteral[]>
    updateCharacter(authToken: string, id: number, updateCharacterDto: any): Promise<ObjectLiteral>
}