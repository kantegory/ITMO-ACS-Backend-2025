import { Request, Response } from "express";
import CountryHouseService from "../services/CountryHouseService";
import LivingService from "../services/living"; // для проверки существования living

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class CountryHouseController {
    createCountryHouse = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { livingId, landArea, communications, recreations } = req.body;

        if (!livingId || landArea === undefined || !communications || !recreations) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        try {
            const living = await LivingService.getLivingById(Number(livingId));

            const countryHouseData = {
                living: living,
                landArea,
                communications,
                recreations,
            };

            const savedHouse = await CountryHouseService.createCountryHouse(countryHouseData);
            res.status(201).json(savedHouse);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getAllCountryHouses = async (_req: Request, res: Response) => {
        try {
            const houses = await CountryHouseService.getCountryHouses();
            res.json(houses);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getCountryHouseById = async (req: Request, res: Response) => {
        try {
            const house = await CountryHouseService.getCountryHouseById(Number(req.params.id));
            res.json(house);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateCountryHouse = async (req: AuthenticatedRequest, res: Response) => {
        const { livingId, landArea, communications, recreations } = req.body;

        try {
            const updateData: any = {};
            if (livingId) {
                updateData.living = await LivingService.getLivingById(Number(livingId));
            }
            if (landArea !== undefined) updateData.landArea = landArea;
            if (communications !== undefined) updateData.communications = communications;
            if (recreations !== undefined) updateData.recreations = recreations;

            const updatedHouse = await CountryHouseService.updateCountryHouse(Number(req.params.id), updateData);
            res.json(updatedHouse);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deleteCountryHouse = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const result = await CountryHouseService.deleteCountryHouse(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new CountryHouseController();
