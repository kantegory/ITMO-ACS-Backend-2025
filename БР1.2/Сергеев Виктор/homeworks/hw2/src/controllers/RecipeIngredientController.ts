import { Request, Response } from "express";
import { RecipeIngredientService } from "../services/RecipeIngredientService";

export class RecipeIngredientController {
    private service: RecipeIngredientService;

    constructor () {
        this.service = new RecipeIngredientService();
    }

    getRecipeIngredients = async (request: Request, response: Response) => {
        const entities = await this.service.getAllRecipeIngredients();
        response.json(entities);
    }

    getRecipeIngredientById = async (request: Request, response: Response) => {
        const entity = await this.service.getRecipeIngredientById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "RecipeIngredient not found"});
        }
        response.json(entity);
    }

    createRecipeIngredient = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createRecipeIngredient(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateRecipeIngredient = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateRecipeIngredient(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "RecipeIngredient not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteRecipeIngredient = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteRecipeIngredient(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "RecipeIngredient not found"});
            } else {
                response.json({message: "RecipeIngredient deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}