import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Property } from "../models/Property";

const propertyRepo = AppDataSource.getRepository(Property);

export const createProperty = async (req: Request, res: Response) => {
    try {
        const propertyData = req.body;
        const property = propertyRepo.create(propertyData);
        const savedProperty = await propertyRepo.save(property);
        res.status(200).json(savedProperty);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllProperties = async (req: Request, res: Response) => {
    try {
        const properties = await propertyRepo.find();
        res.json(properties);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPropertyById = async (req: Request, res: Response):Promise<any> => {
    try {
        const property = await propertyRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json(property);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProperty = async (req: Request, res: Response):Promise<any> => {
    try {
        const property = await propertyRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        propertyRepo.merge(property, req.body);
        const updatedProperty = await propertyRepo.save(property);
        res.json(updatedProperty);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProperty = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await propertyRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.json({ message: "Property deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
