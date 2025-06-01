import { ObjectLiteral } from "typeorm";
import { IBaseCrudService } from "./IBaseCrudService";

export interface IEffectService extends IBaseCrudService
{
    getConditions(effectId: number): Promise<ObjectLiteral[]>
}