import { Request, Response } from 'express';
import * as userService from '../services/UserService';

export const create = async (request: Request, response: Response) => {
    const user = await userService.createUser(request.body);
    response.status(201).json(user)
};

export const findAll = async (_: Request, response: Response) => {
    const users = await userService.getAllUsers();
    response.json(users);
};

export const findOne = async (request: Request, response: Response) => {
    const { id } = request.params;
    const user = await userService.getUserById(+id);
    if (!user) return response.status(404).json({ message: 'Not found' });
    response.json(user);
};

export const findByEmail = async (request: Request, response: Response) => {
    const { email } = request.query;
    if (typeof email !== 'string') return response.status(400).json({ message: 'Email required' });
    const user = await userService.getUserByEmail(email);
    if (!user) return response.status(404).json({ message: 'Not found' });
    response.json(user);
};

export const update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const updated = await userService.updateUser(+id, request.body);
    response.json(updated);
};

export const remove = async (request: Request, response: Response) => {
    await userService.deleteUser(+request.params.id);
    response.status(204).send();
}