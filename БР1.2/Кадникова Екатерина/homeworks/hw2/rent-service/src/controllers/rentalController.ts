import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Rental } from "../models/Rental";
import { User } from "../models/User";
import { Property } from "../models/Property";

const rentalRepo = AppDataSource.getRepository(Rental);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

export const createRental = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { property_id, tenant_id, started_at, ended_at, status } = req.body;

        const property = await propertyRepo.findOneBy({ id: property_id });
        const tenant = await userRepo.findOneBy({ id: tenant_id });

        if (!property || !tenant) {
            return res.status(404).json({ message: "Property or tenant not found" });
        }

        const rental = rentalRepo.create({
            property,
            tenant,
            started_at,
            ended_at,
            status: status || "active",
        });

        await rentalRepo.save(rental);
        return res.status(201).json(rental);
    } catch (err) {
        console.error("Error creating rental:", err);
        return res.status(500).json({ message: "Error creating rental", error: err });
    }
};

export const getAllRentals = async (_req: Request, res: Response) => {
    try {
        const rentals = await rentalRepo.find({ relations: ["property", "tenant"] });
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals", error: err });
    }
};

export const getRentalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rental = await rentalRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["property", "tenant"],
        });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        res.json(rental);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rental", error: err });
    }
};

export const getRentalsByTenant = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.params;
        const rentals = await rentalRepo.find({
            where: { tenant: { id: parseInt(tenantId) } }, // Исправление: привели tenantId к числу
            relations: ["property", "tenant"],
        });

        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals for tenant", error: err });
    }
};

export const getRentalsByProperty = async (req: Request, res: Response) => {
    try {
        const { propertyId } = req.params;
        const rentals = await rentalRepo.find({
            where: { property: { id: parseInt(propertyId) } }, // Исправление: привели propertyId к числу
            relations: ["property", "tenant"],
        });

        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals for property", error: err });
    }
};

export const deleteRental = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rental = await rentalRepo.findOneBy({ id: parseInt(id) });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        await rentalRepo.remove(rental);
        res.json({ message: "Rental deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting rental", error: err });
    }
};

export const updateRentalStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const rental = await rentalRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["property", "tenant"],
        });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        rental.status = status;

        const updatedRental = await rentalRepo.save(rental);
        res.json(updatedRental);
    } catch (err) {
        res.status(500).json({ message: "Error updating rental", error: err });
    }
};