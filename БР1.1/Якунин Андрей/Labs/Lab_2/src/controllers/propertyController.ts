import { Request, Response } from "express";
import PropertyService from "../services/propertyService";

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

class PropertyController {
    createProperty = async (req: AuthenticatedRequest, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        try {
            const propertyData = {
                ...req.body,
                owner: { id: req.user.id },
            };

            const savedProperty = await PropertyService.createProperty(propertyData);
            res.status(201).json(savedProperty);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    updateProperty = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const updatedProperty = await PropertyService.updatePropery(
                Number(req.params.id),
                req.body
            );
            res.json(updatedProperty);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    deleteProperty = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const result = await PropertyService.deleteProperty(Number(req.params.id));
            if (!result.affected) {
                res.status(404).json({ message: 'Property not found' });
                return;
            }
            res.json({ message: 'Property deleted successfully' });
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getAllProperties = async (_req: Request, res: Response) => {
        try {
            const properties = await PropertyService.getAllPropertys();
            res.json(properties);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };

    getPropertyById = async (req: Request, res: Response) => {
        try {
            const property = await PropertyService.getPropertyById(Number(req.params.id));
            if (!property) {
                res.status(404).json({ message: 'Property not found' });
                return;
            }
            res.json(property);
            return;
        } catch (error: any) {
            res.status(500).json({ message: error.message });
            return;
        }
    };
}

export default new PropertyController();
