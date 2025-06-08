import { Request, Response } from "express";
import { IngredientService } from "../services/IngredientService";

export class IngredientController {
    private service: IngredientService;

    constructor () {
        this.service = new IngredientService();
    }

    getIngredients = async (request: Request, response: Response) => {
        const entities = await this.service.getAllIngredients();
        response.json(entities);
    }

    getIngredientById = async (request: Request, response: Response) => {
        const entity = await this.service.getIngredientById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "Ingredient not found"});
        }
        response.json(entity);
    }

    createIngredient = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createIngredient(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateIngredient = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateIngredient(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "Ingredient not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteIngredient = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteIngredient(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "Ingredient not found"});
            } else {
                response.json({message: "Ingredient deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}