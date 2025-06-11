import { Request, Response } from 'express';
import * as rentalService from '../services/rentalService';

export const getAllRentals = async (_req: Request, res: Response) => {
    try {
        const rentals = await rentalService.getAllRentals();
        res.json(rentals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRentalById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const rental = await rentalService.getRentalById(id);
        if (!rental) {
            res.status(404).json({ message: 'Rental not found' });
            return;
        }
        res.json(rental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createRental = async (req: Request, res: Response) => {
    try {
        const rentalData = req.body;
        const newRental = await rentalService.createRental(rentalData);
        res.status(201).json(newRental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRental = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updateData = req.body;
        const updatedRental = await rentalService.updateRental(id, updateData);
        if (!updatedRental) {
            res.status(404).json({ message: 'Rental not found' });
            return;
        }
        res.json(updatedRental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRental = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await rentalService.deleteRental(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Rental not found' });
            return;
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
