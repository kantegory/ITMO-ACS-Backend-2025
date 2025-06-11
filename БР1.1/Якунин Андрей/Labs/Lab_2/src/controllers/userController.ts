import { Request, Response } from "express";
import {AppDataSource} from "../config/AppDataSource";
import {User} from "../entities/User";

const userRepo = AppDataSource.getRepository(User);

export const getProfile = async(req:Request, res:Response) => {
    const userId = (req as any).userId;
    const profile = await userRepo.findOneBy({id: userId});
    if(!profile){
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json({
        id: profile.id,
        email: profile.email
    });
}


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepo.find();
        res.json(users.map(user => ({
            id: user.id,
            email: user.email
        })));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};