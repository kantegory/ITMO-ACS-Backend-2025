import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service';
import { CreatePropertyDto, UpdatePropertyDto } from '../dto/property.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class PropertyController {
    static async create(req: Request, res: Response) {
        const dto = plainToInstance(CreatePropertyDto, req.body);
        await validateOrReject(dto);
        const prop = await PropertyService.createProperty(dto);
        res.status(201).json(prop);
    }

    static async findAll(_: Request, res: Response) {
        const list = await PropertyService.getAllProperties();
        res.json(list);
    }

    static async findOne(req: Request, res: Response) {
        const id = Number(req.params.id);
        const prop = await PropertyService.getPropertyById(id);
        if (!prop) {
            const err: any = new Error('Property not found');
            err.status = 404;
            throw err;
        }
        res.json(prop);
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const dto = plainToInstance(UpdatePropertyDto, req.body);
        await validateOrReject(dto);
        const updated = await PropertyService.updateProperty(id, dto);
        res.json(updated);
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await PropertyService.deleteProperty(id);
        res.sendStatus(204);
    }
    }