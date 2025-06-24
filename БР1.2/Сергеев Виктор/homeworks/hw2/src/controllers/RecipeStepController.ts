import { Request, Response } from "express";
import { RecipeStepService } from "../services/RecipeStepService";

export class RecipeStepController {
    private service: RecipeStepService;

    constructor () {
        this.service = new RecipeStepService();
    }

    getRecipeSteps = async (request: Request, response: Response) => {
        const entities = await this.service.getAllRecipeSteps();
        response.json(entities);
    }

    getRecipeStepById = async (request: Request, response: Response) => {
        const entity = await this.service.getRecipeStepById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "RecipeStep not found"});
        }
        response.json(entity);
    }

    createRecipeStep = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createRecipeStep(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateRecipeStep = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateRecipeStep(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "RecipeStep not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteRecipeStep = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteRecipeStep(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "RecipeStep not found"});
            } else {
                response.json({message: "RecipeStep deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}