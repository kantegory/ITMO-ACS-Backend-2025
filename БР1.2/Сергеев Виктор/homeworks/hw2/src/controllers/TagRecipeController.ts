import { Request, Response } from "express";
import { RecipeTagService } from "../services/RecipeTagService";

export class RecipeTagController {
    private service: RecipeTagService;

    constructor () {
        this.service = new RecipeTagService();
    }

    getRecipeTags = async (request: Request, response: Response) => {
        const entities = await this.service.getAllRecipeTags();
        response.json(entities);
    }

    getRecipeTagById = async (request: Request, response: Response) => {
        const entity = await this.service.getRecipeTagById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "RecipeTag not found"});
        }
        response.json(entity);
    }

    createRecipeTag = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createRecipeTag(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateRecipeTag = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateRecipeTag(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "RecipeTag not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteRecipeTag = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteRecipeTag(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "RecipeTag not found"});
            } else {
                response.json({message: "RecipeTag deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}