import { Request, Response } from "express";
import { SavedRecipeService } from "../services/SavedRecipeService";

export class SavedRecipeController {
    private service: SavedRecipeService;

    constructor () {
        this.service = new SavedRecipeService();
    }

    getSavedRecipes = async (request: Request, response: Response) => {
        const entities = await this.service.getAllSavedRecipes();
        response.json(entities);
    }

    getSavedRecipeById = async (request: Request, response: Response) => {
        const entity = await this.service.getSavedRecipeById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "SavedRecipe not found"});
        }
        response.json(entity);
    }

    createSavedRecipe = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createSavedRecipe(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateSavedRecipe = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateSavedRecipe(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "SavedRecipe not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteSavedRecipe = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteSavedRecipe(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "SavedRecipe not found"});
            } else {
                response.json({message: "SavedRecipe deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}