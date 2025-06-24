import { ObjectLiteral } from "typeorm";
import { IBaseCrudService } from "./IBaseCrudService";

export interface IItemService extends IBaseCrudService
{
    giveEffects(id: number, effectsId: number[]): Promise<void>

    deleteEffects(id: number, effectsId: number[]): Promise<void>
}