import { ExerciseModel } from '../domain/exercise.model';
import { TargetModel } from '../domain/target.model';

export class ExerciseService {
    updateExercise(
        exercise: ExerciseModel,
        name: string,
        description: string,
        target: TargetModel
    ): void {
        exercise.name = name;
        exercise.description = description;
        exercise.target = target;
    }
} 