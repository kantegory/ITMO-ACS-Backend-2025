import { Request, Response } from "express";
import FlatService from "../services/flatService";
import LivingService from "../services/living"; // для проверки существования living

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class FlatController {
    createFlat = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { livingId, floor, kitchenArea, livingArea } = req.body;

        if (!livingId || floor === undefined || kitchenArea === undefined || livingArea === undefined) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            const living = await LivingService.getLivingById(Number(livingId));

            const flatData = {
                floor,
                kitchenArea,
                livingArea,
                living: living,
            };

            const savedFlat = await FlatService.createFlat(flatData);
            res.status(201).json(savedFlat);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getAllFlats = async (_req: Request, res: Response) => {
        try {
            const flats = await FlatService.getFlats();
            res.json(flats);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getFlatById = async (req: Request, res: Response) => {
        try {
            const flat = await FlatService.getFlatsById(Number(req.params.id));
            res.json(flat);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateFlat = async (req: AuthenticatedRequest, res: Response) => {
        const { livingId, floor, kitchenArea, livingArea } = req.body;

        try {
            const updateData: any = {};
            if (livingId) {
                updateData.living = await LivingService.getLivingById(Number(livingId));
            }
            if (floor !== undefined) updateData.floor = floor;
            if (kitchenArea !== undefined) updateData.kitchenArea = kitchenArea;
            if (livingArea !== undefined) updateData.livingArea = livingArea;

            const updatedFlat = await FlatService.updateFlat(Number(req.params.id), updateData);
            res.json(updatedFlat);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deleteFlat = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const result = await FlatService.deleteFlat(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new FlatController();
