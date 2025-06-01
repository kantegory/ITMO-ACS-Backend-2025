import { Request, Response } from "express";
import authService from "../services/authService";
import { RegisterDto, LoginDto } from "../dto/authDto";
import { validateDto } from "../utils/validateDto";

export const register = async (req: Request, res: Response) => {
    const dto = await validateDto(RegisterDto, req.body, res);
    if (!dto) return;

    try {
        const user = await authService.register(dto);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const dto = await validateDto(LoginDto, req.body, res);
    if (!dto) return;

    try {
        const result = await authService.login(dto);
        res.json(result);
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};