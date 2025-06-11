import { Request, Response } from "express";
import RulesService from "../services/rulesService";
import AdvertisementService from "../services/advertisementService";

class RulesController {
    createRule = async (req: Request, res: Response) => {
        try {
            const {
                advertisementId,
                checkInAfter,
                departureBefore,
                guestCount,
                withChildren,
                withAnimals,
                allowedSmoking,
                allowedParties,
                report_docs
            } = req.body;

            const advertisement = await AdvertisementService.getAdvertisementById(Number(advertisementId));
            if (!advertisement) {
                res.status(404).json({ message: "Advertisement not found" });
                return;
            }

            const ruleData = {
                advertisement,
                checkInAfter,
                departureBefore,
                guestCount,
                withChildren,
                withAnimals,
                allowedSmoking,
                allowedParties,
                report_docs
            };

            const newRule = await RulesService.createRule(ruleData);
            res.status(201).json(newRule);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getAllRules = async (_req: Request, res: Response) => {
        try {
            const rules = await RulesService.getAllRules();
            res.json(rules);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getRuleById = async (req: Request, res: Response) => {
        try {
            const rule = await RulesService.getRulesById(Number(req.params.id));
            res.json(rule);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updateRule = async (req: Request, res: Response) => {
        try {
            const {
                advertisementId,
                checkInAfter,
                departureBefore,
                guestCount,
                withChildren,
                withAnimals,
                allowedSmoking,
                allowedParties,
                report_docs
            } = req.body;

            const updateData: any = {};

            if (advertisementId !== undefined) {
                const advertisement = await AdvertisementService.getAdvertisementById(Number(advertisementId));
                if (!advertisement) {
                    res.status(404).json({ message: "Advertisement not found" });
                    return;
                }
                updateData.advertisement = advertisement;
            }
            if (checkInAfter !== undefined) updateData.checkInAfter = checkInAfter;
            if (departureBefore !== undefined) updateData.departureBefore = departureBefore;
            if (guestCount !== undefined) updateData.guestCount = guestCount;
            if (withChildren !== undefined) updateData.withChildren = withChildren;
            if (withAnimals !== undefined) updateData.withAnimals = withAnimals;
            if (allowedSmoking !== undefined) updateData.allowedSmoking = allowedSmoking;
            if (allowedParties !== undefined) updateData.allowedParties = allowedParties;
            if (report_docs !== undefined) updateData.report_docs = report_docs;

            const updatedRule = await RulesService.updateRule(Number(req.params.id), updateData);
            res.json(updatedRule);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deleteRule = async (req: Request, res: Response) => {
        try {
            const result = await RulesService.deleteRule(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new RulesController();
