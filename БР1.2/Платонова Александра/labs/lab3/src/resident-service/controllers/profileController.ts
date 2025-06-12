import { Request, Response } from 'express';
import { ResidentRepository } from '../repositories/residentRepository';

export class ProfileController {
    private residentRepo: ResidentRepository;

    constructor() {
        this.residentRepo = new ResidentRepository();
    }

    async getProfile(req: Request, res: Response) {
        const residentId = req.user.id;
        const profile = await this.residentRepo.findById(residentId);
        res.json(profile);
    }

    async updateProfile(req: Request, res: Response) {
        const residentId = req.user.id;
        await this.residentRepo.updateProfile(residentId, req.body);
        res.status(204).send();
    }
}