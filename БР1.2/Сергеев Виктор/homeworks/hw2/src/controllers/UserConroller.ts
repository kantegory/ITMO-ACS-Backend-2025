import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private service: UserService;

    constructor () {
        this.service = new UserService();
    }

    getUsers = async (request: Request, response: Response) => {
        const entities = await this.service.getAllUsers();
        response.json(entities);
    }

    getUserById = async (request: Request, response: Response) => {
        const entity = await this.service.getUserById(Number(request.params.id));
        if (!entity) {
            response.status(404).json({message: "User not found"});
        }
        response.json(entity);
    }

    createUser = async (request: Request, response: Response) => {
        try {
            const entity = await this.service.createUser(request.body);
            response.status(201).json(entity);
        } catch(error) {
            response.status(400).json({error: error.message})
        }
    }

    updateUser = async (request: Request, response: Response) => {
        try {
            const updated = await this.service.updateUser(Number(request.params.id), request.body);
            if (!updated) {
                response.status(404).json({message: "User not found"});
            } else {
                response.json(updated);
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        try {
            const deleted = await this.service.deleteUser(Number(request.params.id));
            if (!deleted) {
                response.status(404).json({message: "User not found"});
            } else {
                response.json({message: "User deleted"});
            }
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    }
}