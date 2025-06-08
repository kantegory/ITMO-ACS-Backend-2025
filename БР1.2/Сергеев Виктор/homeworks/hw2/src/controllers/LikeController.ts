import { Request, Response } from "express";
import { LikeService } from "../services/LikeService";

export class LikeController {
    private service: LikeService;

    constructor () {
        this.service = new LikeService();
    }

    getLikes = async (request: Request, response: Response) => {
        const entities = await this.service.getAllLikes();
        response.json(entities);
    }

    getLikeById = async (request: Request, response: Response) => {
        const entity = await this.service.getLikeById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "Like not found"});
        }
        response.json(entity);
    }

    createLike = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createLike(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateLike = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateLike(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "Like not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteLike = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteLike(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "Like not found"});
            } else {
                response.json({message: "Like deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}