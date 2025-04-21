import {RequestHandler} from 'express';
import {AdvertisementEntity} from '../models/advertisement.entity';
import advertisementService from '../services/advertisement.service';

class AdvertisementController {
    getAdvertisementById: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const ad = await advertisementService.getAdvertisementById(id);
            res.status(200).json(ad);
        } catch (err) {
            next(err);
        }
    };

    getAllAdvertisements: RequestHandler = async (req, res, next) => {
        try {
            const ads = await advertisementService.getAdvertisements();
            res.status(200).json(ads);
        } catch (err) {
            next(err);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const adData = req.body as AdvertisementEntity;
            const newAd = await advertisementService.create(adData);
            res.status(201).json(newAd);
        } catch (err) {
            next(err);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const updatedData = req.body as AdvertisementEntity;
            const updatedAd = await advertisementService.update(id, updatedData);
            res.status(200).json(updatedAd);
        } catch (err) {
            next(err);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await advertisementService.delete(id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };
}

export default new AdvertisementController();
