import { Request, Response } from 'express';
import { HostelRepository } from '../repositories/hostelRepo';
import { AccessRuleRepository } from 'requisite-service/src/repositories/AccessRuleRepository';
import { LogService } from '../services/LogService';
import { validateHostelData } from '../validators/hostelValidator';

export class HostelController {
    private hostelRepo: HostelRepository;
    private accessRuleRepo: AccessRuleRepository;
    private logService: LogService;

    constructor() {
        this.hostelRepo = new HostelRepository();
        this.accessRuleRepo = new AccessRuleRepository();
        this.logService = new LogService();
    }

    /**
     * Создание общежития (только admin)
     * POST /hostels
     */
    async createHostel(req: Request, res: Response) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Только admin может создавать общежития' });
        }

        const { error, value } = validateHostelData(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const hostel = await this.hostelRepo.createHostel(value);

            await this.logService.log(
                req.user.id,
                'CREATE_HOSTEL',
                `Создано общежитие ID: ${hostel.id}`
            );

            res.status(201).json(hostel);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при создании общежития' });
        }
    }

    /**
     * Получение списка общежитий
     * GET /hostels
     */
    async getHostels(req: Request, res: Response) {
        try {
            // Для менеджеров - только привязанные общежития
            if (req.user.role === 'manager') {
                const rules = await this.accessRuleRepo.find({
                    where: {
                        user: { id: req.user.id },
                        entity_type: 'hostel'
                    }
                });
                const hostelIds = rules.map(rule => rule.entity_id);
                const hostels = await this.hostelRepo.findByIds(hostelIds, { relations: ['address'] });
                return res.json(hostels);
            }

            const hostels = await this.hostelRepo.find({ relations: ['address', 'organization'] });
            res.json(hostels);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при получении списка' });
        }
    }

    /**
     * Получение общежития по ID
     * GET /hostels/:id
     */
    async getHostelById(req: Request, res: Response) {
        try {
            const hostelId = Number(req.params.id);

            if (req.user.role === 'manager') {
                const hasAccess = await this.accessRuleRepo.findOne({
                    where: {
                        user: { id: req.user.id },
                        entity_type: 'hostel',
                        entity_id: hostelId
                    }
                });
                if (!hasAccess) {
                    return res.status(403).json({ error: 'Нет доступа к этому общежитию' });
                }
            }

            const hostel = await this.hostelRepo.findOne({
                where: { id: hostelId },
                relations: ['address', 'rooms']
            });

            if (!hostel) {
                return res.status(404).json({ error: 'Общежитие не найдено' });
            }

            res.json(hostel);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при получении данных' });
        }
    }

    /**
     * Обновление общежития
     * PATCH /hostels/:id
     */
    async updateHostel(req: Request, res: Response) {
        const hostelId = Number(req.params.id);

        if (req.user.role !== 'admin') {
            const hasAccess = await this.accessRuleRepo.findOne({
                where: {
                    user: { id: req.user.id },
                    entity_type: 'hostel',
                    entity_id: hostelId
                }
            });
            if (!hasAccess) {
                return res.status(403).json({ error: 'Нет прав на редактирование' });
            }
        }

        const { error, value } = validateHostelData(req.body, true);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            await this.hostelRepo.update(hostelId, value);
            const updatedHostel = await this.hostelRepo.findOne({ where: { id: hostelId } });

            await this.logService.log(
                req.user.id,
                'UPDATE_HOSTEL',
                `Обновлено общежитие ID: ${hostelId}`
            );

            res.json(updatedHostel);
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при обновлении' });
        }
    }

    /**
     * Удаление общежития (только admin)
     * DELETE /hostels/:id
     */
    async deleteHostel(req: Request, res: Response) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Только admin может удалять общежития' });
        }

        try {
            const hostelId = Number(req.params.id);
            await this.hostelRepo.delete(hostelId);

            await this.logService.log(
                req.user.id,
                'DELETE_HOSTEL',
                `Удалено общежитие ID: ${hostelId}`
            );

            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Ошибка при удалении' });
        }
    }
}