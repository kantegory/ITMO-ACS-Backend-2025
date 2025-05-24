import { Request, Response } from 'express';
import * as photoService from '../services/PhotoService';

export const create = async (request: Request, response: Response) => {
    const photo = await photoService.createPhoto(request.body);
    response.status(201).json(photo);
};

export const findAll = async (_: Request, response: Response) => {
    const photos = await photoService.getAllPhotos();
    response.json(photos);
};

export const findOne = async (request: Request, response: Response) => {
    const photo = await photoService.getPhotoById(+request.params.id);
    if (!photo) return response.status(404).json({ message: 'Not found' });
    response.json(photo);
};

export const update = async (request: Request, response: Response) => {
    const updated = await photoService.updatePhoto(+request.params.id, request.body);
    response.json(updated);
};

export const remove = async (request: Request, response: Response) => {
    await photoService.deletePhoto(+request.params.id);
    response.status(204).send();
};