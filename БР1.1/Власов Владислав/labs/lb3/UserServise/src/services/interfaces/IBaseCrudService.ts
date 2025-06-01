import { DeepPartial, DeleteResult, ObjectLiteral } from "typeorm";
import BaseCrudService from "../BaseCrudService";

export interface IBaseCrudService
{
        post(entity: DeepPartial<ObjectLiteral>): Promise<ObjectLiteral>
        getAll(): Promise<ObjectLiteral[]>
        get(id: number): Promise<ObjectLiteral>
        patch(id: number, entity: DeepPartial<ObjectLiteral>): Promise<ObjectLiteral>
        delete(id: number): Promise<DeleteResult>
}