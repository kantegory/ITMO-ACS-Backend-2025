import { Request, Response } from "express";
import AuthService from "../services/authService";

export const register = (req: Request, res: Response) => {
    console.log("Запрос /register получен!", req.body);
    AuthService.register(req.body.username, req.body.email, req.body.password)
        .then(user => res.status(201).json(user))
        .catch(error => {
            console.error(error);
            res.status(400).json({ message: error.message });
        });
};

export const login = (req: Request, res: Response) => {
    AuthService.login(req.body.email, req.body.password)
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.error(error);
            res.status(400).json({ message: error.message });
        });
};