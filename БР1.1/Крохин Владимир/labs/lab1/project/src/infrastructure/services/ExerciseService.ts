import { ExerciseRepository } from '../repositories/interfaces/exercise.repository';
import { TargetRepository } from '../repositories/interfaces/target.repository';
import { ExerciseModel } from '../domain/exercise.model';
import { ExerciseDto } from '../../dtos/exercise/ExerciseDto';
import { TargetDto } from '../../dtos/target/TargetDto';

export class ExerciseService {
    constructor(
        private readonly exerciseRepository: ExerciseRepository,
        private readonly targetRepository: TargetRepository
    ) {}

    async createExercise(name: string, description: string, shotsInSeries: number, targetId: number): Promise<ExerciseDto> {
        const target = await this.targetRepository.findById(targetId);
        if (!target) {
            throw new Error('Мишень не найдена');
        }

        const exercise = new ExerciseModel(name, description, shotsInSeries, target);
        const savedExercise = await this.exerciseRepository.save(exercise);
        return this.mapToDto(savedExercise);
    }

    async getExerciseById(id: number): Promise<ExerciseDto> {
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new Error('Упражнение не найдено');
        }
        return this.mapToDto(exercise);
    }

    async getAllExercises(): Promise<ExerciseDto[]> {
        const exercises = await this.exerciseRepository.findAll();
        return exercises.map(exercise => this.mapToDto(exercise));
    }

    async getExerciseByName(name: string): Promise<ExerciseDto> {
        const exercise = await this.exerciseRepository.findByName(name);
        if (!exercise) {
            throw new Error('Упражнение не найдено');
        }
        return this.mapToDto(exercise);
    }

    async updateExercise(id: number, name: string, description: string, shotsInSeries: number, targetId: number): Promise<ExerciseDto> {
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new Error('Упражнение не найдено');
        }

        const target = await this.targetRepository.findById(targetId);
        if (!target) {
            throw new Error('Мишень не найдена');
        }

        const existingExercise = await this.exerciseRepository.findByName(name);
        if (existingExercise && existingExercise.id !== id) {
            throw new Error('Упражнение с таким названием уже существует');
        }

        exercise.name = name;
        exercise.description = description;
        exercise.shotsInSeries = shotsInSeries;
        exercise.target = target;

        const updatedExercise = await this.exerciseRepository.save(exercise);
        return this.mapToDto(updatedExercise);
    }

    async deleteExercise(id: number): Promise<void> {
        const exercise = await this.exerciseRepository.findById(id);
        if (!exercise) {
            throw new Error('Упражнение не найдено');
        }
        await this.exerciseRepository.delete(id);
    }

    private mapToDto(model: ExerciseModel): ExerciseDto {
        return {
            id: model.id,
            name: model.name,
            description: model.description,
            shotsInSeries: model.shotsInSeries,
            target: {
                id: model.target.id,
                name: model.target.name,
                description: model.target.description,
                size: model.target.size,
                image: model.target.image
            }
        };
    }
} 