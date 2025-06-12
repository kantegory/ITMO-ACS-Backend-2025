import { Request, Response } from 'express';
import { CheckInOutRepository } from '../repositories/checkInOutRepo';

export class CheckInOutController {
    private checkInOutRepo: CheckInOutRepository;

    constructor() {
        this.checkInOutRepo = new CheckInOutRepository();
    }

    async createCheckInOut(req: Request, res: Response) {
        const checkInOut = await this.checkInOutRepo.createCheckInOut(req.body);
        res.status(201).json(checkInOut);
    }

    async getCheckIns(req: Request, res: Response) {
        const checkIns = await this.checkInOutRepo.findWithFilters(req.query);
        res.json(checkIns);
    }

    async getCheckInById(req: Request, res: Response) {
        const checkIn = await this.checkInOutRepo.findById(Number(req.params.id));
        res.json(checkIn);
    }

    async updateCheckInOut(req: Request, res: Response) {
        const checkInOut = await this.checkInOutRepo.updateCheckInOut(
            Number(req.params.id),
            req.body
        );
        res.json(checkInOut);
    }

    async deleteCheckInOut(req: Request, res: Response) {
        await this.checkInOutRepo.deleteCheckInOut(Number(req.params.id));
        res.status(204).send();
    }
}