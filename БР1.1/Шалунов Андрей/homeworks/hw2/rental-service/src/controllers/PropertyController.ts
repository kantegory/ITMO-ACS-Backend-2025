import { Request, Response } from 'express';
import * as propertyService from '../services/PropertyService';

export const create = async (request: Request, response: Response) => {
    const prop = await propertyService.createProperty(request.body);
    response.status(201).json(prop);
};

export const findAll = async (_: Request, response: Response) => {
    const props = await propertyService.getAllProperties();
    response.json(props);
};

export const findOne = async (request: Request, response: Response) => {
    const prop = await propertyService.getPropertyById(+request.params.id);
    if (!prop) return response.status(404).json({ message: 'Not found' });
    response.json(prop);
};

export const update = async (request: Request, response: Response) => {
    const updated = await propertyService.updateProperty(+request.params.id, request.body);
    response.json(updated);
};

export const remove = async (request: Request, response: Response) => {
    await propertyService.deleteProperty(+request.params.id);
    response.status(204).send();
};