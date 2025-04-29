import { Request, Response } from "express";
import { RecipeService } from "../services/RecipeService";

export class ReciceController {
    private service: RecipeService;

    constructor () {
        this.service = new RecipeService();
    }

    getRecipes = async (request: Request, response: Response) => {
        const entities = await this.service.getAllRecipes();
        response.json(entities);
    }

    getRecipeById = async (request: Request, response: Response) => {
        const entity = await this.service.getRecipeById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "Recipe not found"});
        }
        response.json(entity);
    }

    createRecipe = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createRecipe(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateRecipe = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateRecipe(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "Recipe not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteRecipe = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteRecipe(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "Recipe not found"});
            } else {
                response.json({message: "Recipe deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}