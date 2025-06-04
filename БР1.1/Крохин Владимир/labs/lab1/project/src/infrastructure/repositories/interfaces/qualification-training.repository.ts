import { QualificationTrainingModel } from "../../../application/domain/qualification-training.model";

export interface QualificationTrainingRepository {
    findById(id: number): Promise<QualificationTrainingModel | null>;
    findAllByUser(userId: number): Promise<QualificationTrainingModel[]>;
    save(training: QualificationTrainingModel): Promise<QualificationTrainingModel>;
    delete(id: number): Promise<void>;
} 