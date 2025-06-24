import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Rental } from "../models/Rental";

const rentalRepo = AppDataSource.getRepository(Rental);

export const createRental = async (req: Request, res: Response): Promise<any> => {
    try {
        const rentalData = req.body;
        const rental = rentalRepo.create(rentalData);
        const savedRental = await rentalRepo.save(rental);
        res.status(201).json(savedRental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRentals = async (req: Request, res: Response): Promise<any> => {
    try {
        const rentals = await rentalRepo.find({ relations: ["advertisement", "renter"] });
        res.json(rentals);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRentalById = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const rental = await rentalRepo.findOne({
            where: { id },
            relations: ["advertisement", "renter"]
        });
        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.json(rental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRental = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const rental = await rentalRepo.findOne({ where: { id } });
        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }
        const { total_price, start_date, end_date, status } = req.body;
        if (total_price !== undefined) rental.total_price = total_price;
        if (start_date !== undefined) rental.start_date = start_date;
        if (end_date !== undefined) rental.end_date = end_date;
        if (status !== undefined) rental.status = status;
        const updatedRental = await rentalRepo.save(rental);
        res.json(updatedRental);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRental = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = Number(req.params.id);
        const result = await rentalRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }
        res.json({ message: "Rental deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
