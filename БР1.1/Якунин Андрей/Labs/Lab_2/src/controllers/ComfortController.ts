import { Request, Response } from "express";
import ComfortService from "../services/ComfortService";
import LivingService from "../services/living"; // для проверки существования living

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class ComfortController {
    createComfort = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { livingId, renovation, devices, internet, tv, furniture } = req.body;

        if (
            !livingId ||
            renovation === undefined ||
            devices === undefined ||
            internet === undefined ||
            tv === undefined ||
            furniture === undefined
        ) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            const living = await LivingService.getLivingById(Number(livingId));

            const comfortData = {
                renovation,
                devices,
                internet,
                tv,
                furniture,
                living,
            };

            const savedComfort = await ComfortService.createComfort(comfortData);
            res.status(201).json(savedComfort);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getAllComforts = async (_req: Request, res: Response) => {
        try {
            const comforts = await ComfortService.getComforts();
            res.json(comforts);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getComfortById = async (req: Request, res: Response) => {
        try {
            const comfort = await ComfortService.getComfortById(Number(req.params.id));
            res.json(comfort);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateComfort = async (req: AuthenticatedRequest, res: Response) => {
        const { livingId, renovation, devices, internet, tv, furniture } = req.body;

        try {
            const updateData: Partial<any> = {};

            if (livingId) {
                updateData.living = await LivingService.getLivingById(Number(livingId));
            }
            if (renovation !== undefined) updateData.renovation = renovation;
            if (devices !== undefined) updateData.devices = devices;
            if (internet !== undefined) updateData.internet = internet;
            if (tv !== undefined) updateData.tv = tv;
            if (furniture !== undefined) updateData.furniture = furniture;

            const updatedComfort = await ComfortService.updateComfort(Number(req.params.id), updateData);
            res.json(updatedComfort);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deleteComfort = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const result = await ComfortService.deleteComfort(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new ComfortController();
