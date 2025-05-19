import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { CountryHouse } from "../models/CountryHouse";

const countryHouseRepo = AppDataSource.getRepository(CountryHouse);

export const createCountryHouse = async (req: Request, res: Response) => {
    try {
        const countryHouseData = req.body;
        const countryHouse = countryHouseRepo.create(countryHouseData);
        const savedCountryHouse = await countryHouseRepo.save(countryHouse);
        res.status(200).json(savedCountryHouse);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCountryHouses = async (req: Request, res: Response) => {
    try {
        const countryHouses = await countryHouseRepo.find();
        res.json(countryHouses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCountryHouseById = async (req: Request, res: Response): Promise<any> => {
    try {
        const countryHouse = await countryHouseRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!countryHouse) {
            return res.status(404).json({ message: "CountryHouse not found" });
        }
        res.json(countryHouse);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCountryHouse = async (req: Request, res: Response): Promise<any> => {
    try {
        const countryHouse = await countryHouseRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!countryHouse) {
            return res.status(404).json({ message: "CountryHouse not found" });
        }
        countryHouseRepo.merge(countryHouse, req.body);
        const updatedCountryHouse = await countryHouseRepo.save(countryHouse);
        res.json(updatedCountryHouse);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCountryHouse = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await countryHouseRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "CountryHouse not found" });
        }
        res.json({ message: "CountryHouse deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
