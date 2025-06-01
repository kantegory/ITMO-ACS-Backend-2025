import { Request, Response } from "express";
import rentalService from "../services/rentalService";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rentalDto";
import { validateDto } from "../utils/validateDto";
import { Role } from "../models/enums/role";

export const getAllRentals = async (req: Request, res: Response) => {
    try {
        const rentals = await rentalService.getAllRentals();
        res.json(rentals);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error fetching all rentals" });
    }
};

export const getRentalById = async (req: Request, res: Response) => {
    try {
        const rental = await rentalService.getRentalById(
            Number(req.params.id),
            req.user?.id,
            req.user?.role === Role.ADMIN
        );
        res.json(rental);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Rental not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const getUserRentals = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const rentals = await rentalService.getUserRentals(req.user.id);
        res.json(rentals);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ message: error.message || "Error fetching user rentals" });
    }
};

export const createRental = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(CreateRentalDto, req.body, res);
    if (!dto) return;

    try {
        const rental = await rentalService.createRental(dto, req.user.id);
        res.status(201).json(rental);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};

export const updateRentalStatus = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const updatedRental = await rentalService.updateRentalStatus(
            Number(req.params.id),
            req.body.status,
            req.user.id,
            req.user.role === Role.ADMIN
        );
        res.json(updatedRental);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Rental not found" ? 404 :
                error.message === "Invalid status value" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const updateRental = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(UpdateRentalDto, req.body, res);
    if (!dto) return;

    try {
        const rental = await rentalService.updateRental(
            Number(req.params.id),
            dto,
            req.user.id,
            req.user.role === Role.ADMIN
        );
        res.json(rental);
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Forbidden" ? 403 :
            error.message === "Rental not found" ? 404 :
                error.message === "Invalid dates" ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

export const deleteRental = async (req: Request, res: Response) => {
    if (!req.user?.id || req.user.role !== Role.ADMIN) {
        res.status(403).json({ message: "Forbidden: Admin only" });
        return;
    }

    try {
        await rentalService.deleteRental(Number(req.params.id));
        res.json({ message: "Rental deleted successfully" });
    } catch (err: unknown) {
        const error = err as Error;
        const status = error.message === "Rental not found" ? 404 : 500;
        res.status(status).json({ message: error.message });
    }
};