import { Request, Response } from 'express';
import { WeaponTypeService } from '../../../application/services/WeaponTypeService';

export class WeaponTypeController {
    constructor(private readonly weaponTypeService: WeaponTypeService) {}

    async getWeaponTypeById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const weaponType = await this.weaponTypeService.getWeaponTypeById(id);
            res.json(weaponType);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAllWeaponTypes(req: Request, res: Response): Promise<void> {
        try {
            const weaponTypes = await this.weaponTypeService.getAllWeaponTypes();
            res.json(weaponTypes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createWeaponType(req: Request, res: Response): Promise<void> {
        try {
            const { name, description } = req.body;
            const weaponType = await this.weaponTypeService.createWeaponType(name, description);
            res.status(201).json(weaponType);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateWeaponType(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const { name, description } = req.body;
            const weaponType = await this.weaponTypeService.updateWeaponType(id, name, description);
            res.json(weaponType);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async deleteWeaponType(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            await this.weaponTypeService.deleteWeaponType(id);
            res.status(204).send();
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
} 