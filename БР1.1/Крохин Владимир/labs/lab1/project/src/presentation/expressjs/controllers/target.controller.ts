import { Request, Response, NextFunction } from 'express';
import { TargetService } from '../../../application/services/TargetService';

interface RequestWithUser extends Request {
    user: {
        id: number;
    };
}

export class TargetController {
    constructor(
        private readonly targetService: TargetService
    ) {}

    public createTarget = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, description, size, image } = req.body;
            const target = await this.targetService.createTarget(name, description, size, image);
            res.status(201).json(target);
        } catch (error) {
            next(error);
        }
    };

    public getTarget = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { targetId } = req.params;
            const target = await this.targetService.getTargetById(Number(targetId));
            res.status(200).json(target);
        } catch (error) {
            next(error);
        }
    };

    public updateTarget = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { targetId } = req.params;
            const { name, description, size, image } = req.body;
            const target = await this.targetService.updateTarget(Number(targetId), {
                name,
                description,
                size,
                image
            });
            res.status(200).json(target);
        } catch (error) {
            next(error);
        }
    };

    public deleteTarget = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { targetId } = req.params;
            await this.targetService.deleteTarget(Number(targetId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    public getAllTargets = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const targets = await this.targetService.getAllTargets();
            res.status(200).json(targets);
        } catch (error) {
            next(error);
        }
    };
} 