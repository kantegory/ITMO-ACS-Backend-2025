import { Response, NextFunction } from 'express';
import { SeriesService } from '../../../application/services/SeriesService';
import { RequestWithUser } from '../types/express';

export class SeriesController {
    constructor(
        private readonly seriesService: SeriesService
    ) {}

    public getSeriesDetails = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { seriesId } = req.params;
            const series = await this.seriesService.getSeriesById(Number(seriesId));
            res.status(200).json(series);
        } catch (error) {
            next(error);
        }
    };

    public addShot = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { seriesId } = req.params;
            const { x, y, score, timeOffset, holeSize } = req.body;
            const shot = await this.seriesService.addShot(Number(seriesId), x, y, score, timeOffset, holeSize);
            res.status(201).json(shot);
        } catch (error) {
            next(error);
        }
    };

    public addNote = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { seriesId } = req.params;
            const { content } = req.body;
            const note = await this.seriesService.addNote(Number(seriesId), content);
            res.status(201).json(note);
        } catch (error) {
            next(error);
        }
    };
} 