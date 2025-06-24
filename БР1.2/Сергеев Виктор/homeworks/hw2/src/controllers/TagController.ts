import { Request, Response } from "express";
import { TagService } from "../services/TagService";

export class TagController {
    private service: TagService;

    constructor () {
        this.service = new TagService();
    }

    getTags = async (request: Request, response: Response) => {
        const entities = await this.service.getAllTags();
        response.json(entities);
    }

    getTagById = async (request: Request, response: Response) => {
        const entity = await this.service.getTagById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "Tag not found"});
        }
        response.json(entity);
    }

    createTag = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createTag(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateTag = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateTag(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "Tag not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteTag = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteTag(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "Tag not found"});
            } else {
                response.json({message: "Tag deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}