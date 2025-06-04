import { ShotModel } from "../../../domain/shot.model";

export interface ShotRepository {
    findById(id: number): Promise<ShotModel | null>;
    findAllBySeries(seriesId: number): Promise<ShotModel[]>;
    save(shot: ShotModel): Promise<ShotModel>;
    delete(id: number): Promise<void>;
} 