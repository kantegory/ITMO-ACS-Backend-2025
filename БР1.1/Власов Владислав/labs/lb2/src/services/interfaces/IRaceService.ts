import { IBaseCrudService } from "./IBaseCrudService";

export interface IRaceService extends IBaseCrudService
{

    giveEdges(id: number, edgesId: number[]): Promise<void>

    deleteEdges(id: number, edgesId: number[]): Promise<void>
}