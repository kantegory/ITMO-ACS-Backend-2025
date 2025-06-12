import { Request, Response } from 'express';
import { CheckInOutRepository } from '../repositories/checkInOutRepository';

export class CheckInOutController {
    private checkInOutRepo: CheckInOutRepository;

    constructor() {
        this.checkInOutRepo = new CheckInOutRepository();
    }

    async getMyCheckIns(req: Request, res: Response) {
        const residentId = req.user.id;
        const checkIns = await this.checkInOutRepo.findByResidentId(residentId);
        res.json(checkIns);
    }
}