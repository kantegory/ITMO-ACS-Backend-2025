import { Response, NextFunction } from 'express';
import { FreeTrainingService } from '../../application/services/FreeTrainingService';
import { QualificationTrainingService } from '../../../application/services/QualificationTrainingService';
import { RequestWithUser } from '../types/express';

export class TrainingController {
    constructor(
        private readonly freeTrainingService: FreeTrainingService,
        private readonly qualificationTrainingService: QualificationTrainingService
    ) {}

    public startTraining = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { type, exerciseId, targetId, weaponType } = req.body;
            let training;
            
            if (type === 'qualification') {
                if (!exerciseId) {
                    throw new Error('Exercise ID is required for qualification training');
                }
                training = await this.qualificationTrainingService.startTraining(req.user.id, exerciseId);
            } else if (type === 'free') {
                if (!targetId || !weaponType) {
                    throw new Error('Target ID and weapon type are required for free training');
                }
                training = await this.freeTrainingService.startTraining(req.user.id, weaponType, targetId);
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(201).json(training);
        } catch (error) {
            next(error);
        }
    };

    public endTraining = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { trainingId } = req.params;
            const { type } = req.query;
            
            let training;
            if (type === 'qualification') {
                training = await this.qualificationTrainingService.completeTraining(Number(trainingId));
            } else if (type === 'free') {
                training = await this.freeTrainingService.completeTraining(Number(trainingId));
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(200).json(training);
        } catch (error) {
            next(error);
        }
    };

    public getTrainingDetails = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { trainingId } = req.params;
            const { type } = req.query;
            
            let training;
            if (type === 'qualification') {
                training = await this.qualificationTrainingService.getTrainingById(Number(trainingId));
            } else if (type === 'free') {
                training = await this.freeTrainingService.getTrainingById(Number(trainingId));
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(200).json(training);
        } catch (error) {
            next(error);
        }
    };

    public getUserTrainings = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { type } = req.query;
            
            let trainings;
            if (type === 'qualification') {
                trainings = await this.qualificationTrainingService.getUserTrainings(req.user.id);
            } else if (type === 'free') {
                trainings = await this.freeTrainingService.getUserTrainings(req.user.id);
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(200).json(trainings);
        } catch (error) {
            next(error);
        }
    };

    public addNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { trainingId } = req.params;
            const { content, type } = req.body;
            
            let note;
            if (type === 'qualification') {
                note = await this.qualificationTrainingService.addNote(Number(trainingId), req.user.id, content);
            } else if (type === 'free') {
                note = await this.freeTrainingService.addNote(Number(trainingId), req.user.id, content);
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(201).json(note);
        } catch (error) {
            next(error);
        }
    };

    public addSeries = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { trainingId } = req.params;
            const { maxShots, type } = req.body;
            
            let series;
            if (type === 'qualification') {
                series = await this.qualificationTrainingService.addSeries(Number(trainingId), maxShots);
            } else if (type === 'free') {
                series = await this.freeTrainingService.addSeries(Number(trainingId), maxShots);
            } else {
                throw new Error('Invalid training type');
            }
            
            res.status(201).json(series);
        } catch (error) {
            next(error);
        }
    };
} 