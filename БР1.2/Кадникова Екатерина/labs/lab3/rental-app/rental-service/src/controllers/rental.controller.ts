import { Request, Response } from "express";
import rentalService from "../services/rental.service";
import { validateDto } from "../utils/validate.util";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rental.dto";
import authClient from "../services/auth.client";

export class RentalController {
    async getAllRentals(req: Request, res: Response) {
        try {
            const rentals = await rentalService.getAllRentals(req);
            res.json(rentals);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRentalById(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const rental = await rentalService.getRentalById(
                Number(req.params.id),
                user.id,
                user.role === 'ADMIN',
                req
            );
            res.json(rental);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Rental not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async getUserRentals(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const rentals = await rentalService.getUserRentals(user.id, req);
            res.json(rentals);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createRental(req: Request, res: Response) {
        const dto = await validateDto(CreateRentalDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const rental = await rentalService.createRental(dto, user.id, req);
            res.status(201).json(rental);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateRentalStatus(req: Request, res: Response) {
        try {
            const user = await authClient.verifyToken(req);
            const updatedRental = await rentalService.updateRentalStatus(
                Number(req.params.id),
                req.body.status,
                user.id,
                user.role === 'ADMIN',
                req
            );
            res.json(updatedRental);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Rental not found" ? 404 :
                    error.message === "Invalid status value" ? 400 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async updateRental(req: Request, res: Response) {
        const dto = await validateDto(UpdateRentalDto, req.body, req, res);
        if (!dto) return;

        try {
            const user = await authClient.verifyToken(req);
            const rental = await rentalService.updateRental(
                Number(req.params.id),
                dto,
                user.id,
                user.role === 'ADMIN',
                req
            );
            res.json(rental);
        } catch (error: any) {
            const status = error.message === "Forbidden" ? 403 :
                error.message === "Rental not found" ? 404 :
                    error.message === "Invalid dates" ? 400 : 500;
            res.status(status).json({ message: error.message });
        }
    }

    async deleteRental(req: Request, res: Response): Promise<void> {
        try {
            const user = await authClient.verifyToken(req);
            if (user.role !== 'ADMIN') {
                res.status(403).json({ message: "Forbidden: Admin only" });
                return;
            }

            await rentalService.deleteRental(Number(req.params.id));
            res.json({ message: "Rental deleted successfully" });
        } catch (error: any) {
            const status = error.message === "Rental not found" ? 404 : 500;
            res.status(status).json({ message: error.message });
        }
    }
}

export default new RentalController();