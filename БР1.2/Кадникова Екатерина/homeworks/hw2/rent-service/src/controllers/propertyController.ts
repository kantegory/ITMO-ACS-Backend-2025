import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Property } from "../models/Property";
import { User } from "../models/User";

const propertyRepo = AppDataSource.getRepository(Property);
const userRepo = AppDataSource.getRepository(User);

export const createProperty = async (req: Request, res: Response) => {
    try {
        const {
            ownerId,
            title,
            description,
            rental_type,
            price,
            location,
            property_type,
        } = req.body;

        const owner = await userRepo.findOneBy({ id: ownerId });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const property = propertyRepo.create({
            owner,
            title,
            description,
            rental_type,
            price,
            location,
            property_type,
        });

        await propertyRepo.save(property);
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ message: "Error creating property", error: err });
    }
};

export const getAllProperties = async (_req: Request, res: Response) => {
    try {
        const properties = await propertyRepo.find({ relations: ["owner"] });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: "Error fetching properties", error: err });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const property = await propertyRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["owner"],
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.json(property);
    } catch (err) {
        res.status(500).json({ message: "Error fetching property", error: err });
    }
};

export const updateProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const property = await propertyRepo.findOneBy({ id: parseInt(id) });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        propertyRepo.merge(property, data);
        await propertyRepo.save(property);
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: "Error updating property", error: err });
    }
};

export const deleteProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const property = await propertyRepo.findOneBy({ id: parseInt(id) });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await propertyRepo.remove(property);
        res.json({ message: "Property deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting property", error: err });
    }
};