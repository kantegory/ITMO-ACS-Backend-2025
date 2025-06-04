import { Response, NextFunction } from 'express';
import { ExerciseService } from '../../application/services/ExerciseService';
import { RequestWithUser } from '../types/express';

export class ExerciseController {
    constructor(
        private readonly exerciseService: ExerciseService
    ) {}

    public createExercise = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, description, shotsInSeries, targetId } = req.body;
            const exercise = await this.exerciseService.createExercise(name, description, shotsInSeries, targetId);
            res.status(201).json(exercise);
        } catch (error) {
            next(error);
        }
    };

    public getExercise = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { exerciseId } = req.params;
            const exercise = await this.exerciseService.getExerciseById(Number(exerciseId));
            res.status(200).json(exercise);
        } catch (error) {
            next(error);
        }
    };

    public updateExercise = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { exerciseId } = req.params;
            const { name, description, shotsInSeries, targetId } = req.body;
            const exercise = await this.exerciseService.updateExercise(
                Number(exerciseId),
                name,
                description,
                shotsInSeries,
                targetId
            );
            res.status(200).json(exercise);
        } catch (error) {
            next(error);
        }
    };

    public deleteExercise = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { exerciseId } = req.params;
            await this.exerciseService.deleteExercise(Number(exerciseId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    public getAllExercises = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const exercises = await this.exerciseService.getAllExercises();
            res.status(200).json(exercises);
        } catch (error) {
            next(error);
        }
    };
} 