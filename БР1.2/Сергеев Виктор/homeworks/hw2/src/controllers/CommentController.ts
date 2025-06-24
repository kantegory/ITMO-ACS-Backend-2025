import { Request, Response } from "express";
import { CommentService } from "../services/CommentService";

export class CommentController {
    private service: CommentService;

    constructor () {
        this.service = new CommentService();
    }

    getComments = async (request: Request, response: Response) => {
        const entities = await this.service.getAllComments();
        response.json(entities);
    }

    getCommentById = async (request: Request, response: Response) => {
        const entity = await this.service.getCommentById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "Comment not found"});
        }
        response.json(entity);
    }

    createComment = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createComment(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateComment = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateComment(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "Comment not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteComment = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteComment(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "Comment not found"});
            } else {
                response.json({message: "Comment deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}