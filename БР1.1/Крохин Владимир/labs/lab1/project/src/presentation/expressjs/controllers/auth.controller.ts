import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../application/services/AuthService';

interface RequestWithUser extends Request {
    user: {
        id: number;
    };
}

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, password, email, firstName, lastName } = req.body;
            const user = await this.authService.register(username, password, email, firstName, lastName);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { username, password } = req.body;
            const result = await this.authService.login(username, password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public getProfile = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.authService.getProfile(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public updateEmail = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email } = req.body;
            const user = await this.authService.updateEmail(req.user.id, email);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public updateName = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { firstName, lastName } = req.body;
            const user = await this.authService.updateName(req.user.id, firstName, lastName);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };

    public getRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const role = await this.authService.getUserRole(req.user.id);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    };

    public assignRole = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { roleName } = req.body;
            const role = await this.authService.assignRole(req.user.id, roleName);
            res.status(200).json(role);
        } catch (error) {
            next(error);
        }
    };
}
