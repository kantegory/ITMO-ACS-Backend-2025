import { ExerciseRepository } from '../repositories/interfaces/exercise.repository';
import { TargetRepository } from '../repositories/interfaces/target.repository';
import { ExerciseService } from '../../application/services/exercise.service';
import { ExerciseModel } from '../../application/domain/exercise.model';
import { TargetModel } from '../../application/domain/target.model';

export class ExerciseInfrastructureService {
    constructor(
        private readonly exerciseRepository: ExerciseRepository,
        private readonly targetRepository: TargetRepository,
        private readonly exerciseService: ExerciseService
    ) {}

    async getExerciseById(id: number): Promise<ExerciseModel> {
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new Error('Exercise not found');
        }
        return exercise;
    }

    async getAllExercises(): Promise<ExerciseModel[]> {
        return this.exerciseRepository.findAll();
    }

    async createExercise(
        name: string,
        description: string,
        targetId: number
    ): Promise<ExerciseModel> {
        const target = await this.targetRepository.findById(targetId);
        if (!target) {
            throw new Error('Target not found');
        }

        const exercise = new ExerciseModel(name, description, target);
        return this.exerciseRepository.save(exercise);
    }

    async updateExercise(
        id: number,
        name: string,
        description: string,
        targetId: number
    ): Promise<ExerciseModel> {
        const exercise = await this.getExerciseById(id);
        const target = await this.targetRepository.findById(targetId);
        if (!target) {
            throw new Error('Target not found');
        }

        this.exerciseService.updateExercise(exercise, name, description, target);
        return this.exerciseRepository.save(exercise);
    }

    async deleteExercise(id: number): Promise<void> {
        await this.getExerciseById(id);
        await this.exerciseRepository.delete(id);
    }
} 