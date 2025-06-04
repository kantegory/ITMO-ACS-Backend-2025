import { Response, NextFunction } from 'express';
import { ShotService } from '../../../application/services/ShotService';
import { RequestWithUser } from '../types/express';

export class ShotController {
    constructor(
        private readonly shotService: ShotService
    ) {}

    public getShotDetails = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { shotId } = req.params;
            const shot = await this.shotService.getById(Number(shotId));
            res.status(200).json(shot);
        } catch (error) {
            next(error);
        }
    };
} 