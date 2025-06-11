import {Response, Request} from 'express';
import {AppDataSource} from "../config/AppDataSource";
import {User} from "../entities/User"
import hashPassword from '../utils/hashPassword';
import checkPassword from '../utils/checkPassword';
import { generateJWT } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
    try{
        const {username, password, email} = req.body;
        const user = await userRepo.findOneBy({ email });
        if (user) {
            res.status(400).json({ message: 'Email already in use' });
            return;
        }
        const hashedPassword = await hashPassword(password);
        const new_user = userRepo.create({
            username,
            password: hashedPassword,
            email,
        })
        await userRepo.save(new_user);
        res.status(200).json(new_user);
    }catch(error: any){
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findOneBy({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = checkPassword(user.password, password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = generateJWT(user.id, user.email);

        res.json({ token });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { newPassword, oldPassword } = req.body;
        const userId = (req as any).userId;
        if (!userId) {
            res.status(400).json({ message: 'User not authenticated' });
            return;
        }

        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isOldPasswordValid = await checkPassword(oldPassword, user.password);
        if (!isOldPasswordValid) {
            res.status(401).json({ message: 'Incorrect old password' });
            return;
        }
        const hashedNewPassword = await hashPassword(newPassword);
        user.password = hashedNewPassword;
        await userRepo.save(user);
        res.status(200).json({ message: 'Password updated successfully' });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
};
