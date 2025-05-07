import { Request, Response } from 'express';
import { User } from '../models/user.entity';
import { AppDataSource } from '../config/data-source';
import { AuthRequest } from '../middlewares/types';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (request: Request, response: Response) => {
    try {
        const user = userRepository.create(request.body);
        const savedUser = await userRepository.save(user);
        response.status(201).json(savedUser);
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
};

export const getUsers = async (_: Request, response: Response) => {
    try {
        const users = await userRepository.find();
        response.json(users)
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
};

export const getUser = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const user = await userRepository.findOneBy({ user_id: id });
        if (!user) {
            response.status(404).json({ message: 'User not found' });
            return;
        }
        response.json(user);

    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
};

export const getUserMe = async (request: AuthRequest, response: Response): Promise<void>  => {
    try {
        const userId = request.user?.userId;
        if (!userId) {
            response.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = await userRepository.findOneBy({ user_id: userId });
        if (!user) {
            response.status(404).json({ message: 'User not found' });
            return;
        }
        response.json(user);
        
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }   
};

export const updateUser = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const result = await userRepository.update({ user_id: id }, request.body);
        if (result.affected === 0) {
            response.status(404).json({ message: 'User not found' });
            return;
        }
        response.json({ message: 'User updated successfully' });
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    } 
};

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const id = Number(request.params.id);
        const result = await userRepository.delete({ user_id: id });
        if (result.affected === 0) {
            response.status(404).json({ message: 'User not found' });
            return;
        }
        response.status(204).send();
    } catch (error: any) {
        response.status(500).json({ message: error.message });
    }
};