import { Request, Response } from "express";
import propertyService from "../services/property.service";
import { CreatePropertyDto, UpdatePropertyDto, SearchPropertyDto } from "../dto/property.dto";
import { validateDto } from "../utils/validate.util";
import authClient from "../services/auth.client";

export class PropertyController {
    async getAllProperties(req: Request, res: Response) {
        try {
            const properties = await propertyService.getAllProperties();
            res.json(properties);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPropertyById(req: Request, res: Response) {
        try {
            const property = await propertyService.getPropertyById(Number(req.params.id));
            res.json(property);
        } catch (error: any) {
            const status = error.message === "Property not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async createProperty(req: Request, res: Response) {
        const dto = await validateDto(CreatePropertyDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const property = await propertyService.createProperty(dto, user.id, req);
            res.status(201).json(property);
        } catch (error: any) {
            const status = error.message.includes('Token') ? 401 : 400;
            res.status(status).json({ message: error.message });
        }
    }

    async updateProperty(req: Request, res: Response) {
        const dto = await validateDto(UpdatePropertyDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const property = await propertyService.updateProperty(
                Number(req.params.id),
                dto,
                user.id,
                user.role
            );
            res.json(property);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Property not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async deleteProperty(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const result = await propertyService.deleteProperty(
                Number(req.params.id),
                user.id,
                user.role
            );
            res.json(result);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Property not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async searchProperties(req: Request, res: Response) {
        const dto = await validateDto(SearchPropertyDto, req.body, req, res);
        if (!dto) return;

        try {
            const properties = await propertyService.searchProperties(dto);
            res.json(properties);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PropertyController();