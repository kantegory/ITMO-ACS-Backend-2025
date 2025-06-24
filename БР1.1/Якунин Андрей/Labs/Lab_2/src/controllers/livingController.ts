import { Request, Response } from "express";
import LivingService from "../services/living"

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class LivingController {
    createLiving = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const livingData = {
                ...req.body,
                property: { owner: { id: req.user.id } }, // если ты хочешь установить владельца через property
            };

            const savedLiving = await LivingService.create(livingData);
            res.status(201).json(savedLiving);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };
    getAllLivings = async (_req: Request, res: Response) => {
        try {
            const livings = await LivingService.getLivings();
            res.json(livings);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getLivingById = async (req: Request, res: Response) => {
        try {
            const living = await LivingService.getLivingById(Number(req.params.id));
            res.json(living);
            return;
        } catch (error: any) {
            res.status(404).json({ message: error.message });
            return;
        }
    };

    updateLiving = async (req: Request, res: Response) => {
        try {
            const updatedLiving = await LivingService.update(Number(req.params.id), req.body);
            res.json(updatedLiving);
            return;
        } catch (error: any) {
            res.status(404).json({ message: error.message });
            return
        }
    };
    deleteLiving = async (req: Request, res: Response) => {
        try {
            const result = await LivingService.delete(Number(req.params.id));
            res.json(result);
            return;
        } catch (error: any) {
           res.status(404).json({ message: error.message });
           return;
        }
    };
}

export default new LivingController();
