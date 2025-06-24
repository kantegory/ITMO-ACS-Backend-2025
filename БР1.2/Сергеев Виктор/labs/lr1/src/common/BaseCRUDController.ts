import { Request, Response } from "express"
import { BaseController } from "./BaseController";
import { BaseCRUDService } from "./BaseCRUDService";

export class BaseCRUDController<T> extends BaseController<T> {
    protected service: BaseCRUDService<T>

    constructor(model: new() => T) {
        super(model);
        this.service = new BaseCRUDService<T>(model);
    }

    getAllEntities = async (request: Request, response: Response) => {
        const entities = await this.service.getAllEntities();
        response.json(entities);
    }

    getEntityById = async (request: Request, response: Response) => {
        const entity = await this.service.getEntityById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: `${this.model.name} not found`})
        } else {
            response.json(entity)
        }
    }

    createEntity = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createEntity(request.body);
            response.status(201).json(entity);
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    updateEntity = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateEntity(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: `${this.model.name} not found`});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(404).json({error: error.message});
        }
    }

    deleteEntity = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteEntity(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: `${this.model.name} not found`});
            } else {
                response.json({message: `${this.model.name} deleted`});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}