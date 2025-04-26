import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSourse";
import { Photo } from "../models/Photo";
import { Advertisement } from "../models/Advertisement";

const photoRepo = AppDataSource.getRepository(Photo);

export const getAllPhotos = async (req: Request, res: Response) => {
    try {
        const photos = await photoRepo.find({
            relations: ['advertisement'],
        });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getPhotoById = async (req: Request, res: Response) => {
    try {
        const photo = await photoRepo.findOne({
            where: { id: Number(req.params.id) },
            relations: ['advertisement'],
        });
        if (!photo) {
            res.status(404).json({ message: 'Photo not found' });
            return;
        }
        res.json(photo);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createPhoto = async (req: Request, res: Response) => {
    try {
        const { advertisementId, url } = req.body;
        const advertisement = await AppDataSource.getRepository(Advertisement).findOne({ where: { id: advertisementId } });
        if (!advertisement) {
            res.status(404).json({ message: "Advertisement not found" });
            return;
        }
        const photo = photoRepo.create({ advertisement, url });
        const savedPhoto = await photoRepo.save(photo);
        res.status(201).json(savedPhoto);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updatePhoto = async (req: Request, res: Response) => {
    try {
        const { advertisementId, url } = req.body;
        const photo = await photoRepo.findOne({ where: { id: Number(req.params.id) } });
        if (!photo) {
            res.status(404).json({ message: 'Photo not found' });
            return;
        }
        const advertisement = await AppDataSource.getRepository(Advertisement).findOne({ where: { id: advertisementId } });
        if (!advertisement) {
            res.status(404).json({ message: "Advertisement not found" });
            return;
        }
        photo.advertisement = advertisement;
        photo.url = url;
        const updatedPhoto = await photoRepo.save(photo);
        res.json(updatedPhoto);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deletePhoto = async (req: Request, res: Response) => {
    try {
        const result = await photoRepo.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Photo not found' });
            return;
        }
        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
