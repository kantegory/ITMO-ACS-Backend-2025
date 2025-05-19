import { ObjectLiteral } from "typeorm";
import { IBaseCrudService } from "./IBaseCrudService";

export interface IEdgeService extends IBaseCrudService
{
    giveEffects(id: number, effectsId: number[]): Promise<void>

    deleteEffects(id: number, effectsd: number[]): Promise<void>
}