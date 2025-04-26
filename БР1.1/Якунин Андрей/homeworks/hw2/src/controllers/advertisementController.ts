import { Request, Response } from "express";
import { Advertisement } from "../models/Advertisement";
import { AppDataSource } from "../config/AppDataSourse";

const advertisementRepo = AppDataSource.getRepository(Advertisement)

export const getAllAdvertisements = async (req: Request, res: Response) => {
    try {
        const advertisements = await advertisementRepo.find({
            relations: ['owner', 'category'],
        });
        res.json(advertisements);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};




export const getAdvertisementById = async (req: Request, res: Response): Promise<any> => {
    try {
        const advertisement = await advertisementRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ['owner', 'category'],
        });

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.json(advertisement);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const createAdvertisement = async (req: Request, res: Response) => {
    try {
        const advertisementData = req.body;
        const advertisement = advertisementRepo.create(advertisementData);
        const savedAdvertisement = await advertisementRepo.save(advertisement);
        res.status(201).json(savedAdvertisement);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updateAdvertisement = async (req: Request, res: Response):Promise<any>  => {
    try{
        const advertisement = await advertisementRepo.findOne({where: {id: Number(req.params)}});
        if (!advertisement){
            return res.status(404).json({message: "Advertsiment not found" });
        }
        advertisementRepo.merge(advertisement, req.body);
        const updatedAdvertisement = await advertisementRepo.save(advertisement);
        res.json(updatedAdvertisement);
    }catch(error: any){
        res.status(500).json({ message: error.message });
    }
};


export const deleteAdvertisement = async (req: Request, res: Response):Promise<any> => {
    try {
        const result = await advertisementRepo.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Category not found"});
        }
        res.json({message: "Category deleted successfully"});
    }catch (error: any){
        res.status(500).json({ message: error.message });
    }
}


