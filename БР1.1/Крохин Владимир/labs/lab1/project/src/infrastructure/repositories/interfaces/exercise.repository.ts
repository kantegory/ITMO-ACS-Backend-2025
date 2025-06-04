import { ExerciseModel } from '../../../application/domain/exercise.model';

export interface ExerciseRepository {
    findById(id: number): Promise<ExerciseModel | null>;
    findAll(): Promise<ExerciseModel[]>;
    save(exercise: ExerciseModel): Promise<ExerciseModel>;
    delete(id: number): Promise<void>;
} 