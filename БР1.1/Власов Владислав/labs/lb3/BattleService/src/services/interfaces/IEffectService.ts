import { ObjectLiteral } from "typeorm";

export interface IEffectService
{
    getConditions(authToken: string, effectId: number): Promise<ObjectLiteral[]>
}