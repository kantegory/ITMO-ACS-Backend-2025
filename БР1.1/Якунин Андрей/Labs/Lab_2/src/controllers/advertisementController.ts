import { Request, Response } from "express";
import AdvertisementService from "../services/advertisementService";

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class AdvertisementController {
    createAdvertisement = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        try {
            const advertisementData = {
                ...req.body,
                owner: { id: req.user.id },
            };

            const saved = await AdvertisementService.create(advertisementData);
            res.status(201).json(saved);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    updateAdvertisement = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const updated = await AdvertisementService.updateAdvertisement(
                Number(req.params.id),
                req.body
            );
            res.json(updated);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    deleteAdvertisement = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const result = await AdvertisementService.deleteAdvertisement(Number(req.params.id));
            res.json(result);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getAllAdvertisements = async (_req: Request, res: Response) => {
        try {
            const ads = await AdvertisementService.getAdvertisements();
            res.json(ads);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getAdvertisementById = async (req: Request, res: Response) => {
        try {
            const ad = await AdvertisementService.getAdvertisementById(Number(req.params.id));
            if (!ad) {
                res.status(404).json({ message: 'Advertisement not found' });
                return;
            }

            res.json(ad);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };
}

export default new AdvertisementController();
