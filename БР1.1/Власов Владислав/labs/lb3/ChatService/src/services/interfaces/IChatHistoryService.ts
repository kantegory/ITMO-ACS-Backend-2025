import { DeepPartial, ObjectLiteral } from "typeorm";

export interface IChatHistoryService
{
    getAll(): Promise<ObjectLiteral[]>
}