import { Request, Response } from "express";
import propertyService from "../services/propertyService";
import { CreatePropertyDto, UpdatePropertyDto, SearchPropertyDto } from "../dto/propertyDto";
import { validateDto } from "../utils/validateDto";
import { Role } from "../models/enums/role";

export const getAllProperties = async (req: Request, res: Response) => {
    try {
        const properties = await propertyService.getAllProperties();
        res.json(properties);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error fetching properties" });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    try {
        const property = await propertyService.getPropertyById(Number(req.params.id));
        res.json(property);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Property not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const createProperty = async (req: Request, res: Response) => {
    const dto = await validateDto(CreatePropertyDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const property = await propertyService.createProperty(dto, userId);
        res.status(201).json(property);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};

export const updateProperty = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdatePropertyDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const property = await propertyService.updateProperty(
            Number(req.params.id),
            dto,
            userId,
            req.user?.role as Role
        );
        res.json(property);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Property not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const deleteProperty = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const result = await propertyService.deleteProperty(
            Number(req.params.id),
            userId,
            req.user?.role as Role
        );
        res.json(result);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Property not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const searchProperties = async (req: Request, res: Response) => {
    const dto = await validateDto(SearchPropertyDto, req.query, res);
    if (!dto) return;

    try {
        const properties = await propertyService.searchProperties(dto);
        res.json(properties);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error searching properties" });
    }
};