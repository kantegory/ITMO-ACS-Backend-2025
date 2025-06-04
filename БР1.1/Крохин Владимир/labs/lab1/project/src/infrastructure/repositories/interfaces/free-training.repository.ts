import { FreeTrainingModel } from "../../../application/domain/free-training.model";

export interface FreeTrainingRepository {
    findById(id: number): Promise<FreeTrainingModel | null>;
    findAllByUser(userId: number): Promise<FreeTrainingModel[]>;
    save(training: FreeTrainingModel): Promise<FreeTrainingModel>;
    delete(id: number): Promise<void>;
} 