import { Request, Response } from "express";
import PhotoService from "../services/photoService";
import AdvertisementService from "../services/advertisementService";

class PhotoController {
    createPhoto = async (req: Request, res: Response) => {
        try {
            const { advertisementId, path } = req.body;

            if (!advertisementId || !path) {
                res.status(400).json({ message: "advertisementId and path are required" });
                return;
            }

            const advertisement = await AdvertisementService.getAdvertisementById(Number(advertisementId));
            if (!advertisement) {
                res.status(404).json({ message: "Advertisement not found" });
                return;
            }

            const photoData = {
                advertisement,
                path,
            };

            const newPhoto = await PhotoService.create(photoData);
            res.status(201).json(newPhoto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getAllPhotos = async (_req: Request, res: Response) => {
        try {
            const photos = await PhotoService.getPhotos();
            res.json(photos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getPhotoById = async (req: Request, res: Response) => {
        try {
            const photo = await PhotoService.getPhotoById(Number(req.params.id));
            res.json(photo);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    updatePhoto = async (req: Request, res: Response) => {
        try {
            const { advertisementId, path } = req.body;

            const updateData: any = {};

            if (advertisementId !== undefined) {
                const advertisement = await AdvertisementService.getAdvertisementById(Number(advertisementId));
                if (!advertisement) {
                    res.status(404).json({ message: "Advertisement not found" });
                    return;
                }
                updateData.advertisement = advertisement;
            }
            if (path !== undefined) updateData.path = path;

            const updatedPhoto = await PhotoService.updatePhoto(Number(req.params.id), updateData);
            res.json(updatedPhoto);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    deletePhoto = async (req: Request, res: Response) => {
        try {
            const result = await PhotoService.deletePhoto(Number(req.params.id));
            res.json(result);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

export default new PhotoController();
