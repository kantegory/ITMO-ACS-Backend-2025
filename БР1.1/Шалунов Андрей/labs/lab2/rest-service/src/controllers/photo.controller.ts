import { Request, Response } from 'express';
import { PhotoService } from '../services/photo.service';
import { CreatePhotoDto, UpdatePhotoDto } from '../dto/photo.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class PhotoController {
    static async create(req: Request, res: Response) {
        const dto = plainToInstance(CreatePhotoDto, req.body);
        await validateOrReject(dto);
        const photo = await PhotoService.createPhoto(dto);
        res.status(201).json(photo);
    }

    static async findAll(_: Request, res: Response) {
        const list = await PhotoService.getAllPhotos();
        res.json(list);
    }

    static async findOne(req: Request, res: Response) {
        const id = Number(req.params.id);
        const photo = await PhotoService.getPhotoById(id);
        if (!photo) {
            const err: any = new Error('Photo not found');
            err.status = 404;
            throw err;
        }
        res.json(photo);
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const dto = plainToInstance(UpdatePhotoDto, req.body);
        await validateOrReject(dto);
        const updated = await PhotoService.updatePhoto(id, dto);
        res.json(updated);
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await PhotoService.deletePhoto(id);
        res.sendStatus(204);
    }
}