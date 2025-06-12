import { Request, Response } from 'express';
import { ResidentRepository } from '../repositories/residentRepo';
import { LogService } from '../middlewares/LogService';
import { validateResidentData } from '../validators/ResidentValidator';

export class ResidentController {
    private residentRepo: ResidentRepository;
    private logService: LogService;

    constructor() {
        this.residentRepo = new ResidentRepository();
        this.logService = new LogService();
    }

    async getResidents(req: Request, res: Response) {
        try {
            const residents = await this.residentRepo.findWithFilters(req.query);
            res.json(residents);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении списка жильцов' });
        }
    }

    async getResidentById(req: Request, res: Response) {
        try {
            const resident = await this.residentRepo.findById(Number(req.params.id));
            if (!resident) {
                return res.status(404).json({ error: 'Жилец не найден' });
            }
            res.json(resident);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении данных' });
        }
    }

    async createResident(req: Request, res: Response) {
        const { error, value } = validateResidentData(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const resident = await this.residentRepo.createResident(value);

            await this.logService.log(
                req.user.id,
                'CREATE_RESIDENT',
                `Создан жилец ID: ${resident.id}`
            );

            res.status(201).json(resident);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при создании жильца' });
        }
    }

    async updateResident(req: Request, res: Response) {
        const { error, value } = validateResidentData(req.body, true);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            await this.residentRepo.updateResident(Number(req.params.id), value);
            const updatedResident = await this.residentRepo.findById(Number(req.params.id));

            await this.logService.log(
                req.user.id,
                'UPDATE_RESIDENT',
                `Обновлен жилец ID: ${req.params.id}`
            );

            res.json(updatedResident);
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при обновлении' });
        }
    }

    async deleteResident(req: Request, res: Response) {
        try {
            await this.residentRepo.deleteResident(Number(req.params.id));

            await this.logService.log(
                req.user.id,
                'DELETE_RESIDENT',
                `Удален жилец ID: ${req.params.id}`
            );

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при удалении' });
        }
    }
}