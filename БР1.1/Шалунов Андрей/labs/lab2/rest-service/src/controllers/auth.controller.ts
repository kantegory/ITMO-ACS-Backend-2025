import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';

export class AuthController {
    static async register(req: Request, res: Response) {
        const dto = plainToInstance(RegisterDto, req.body);
        await validateOrReject(dto);

        const user = await AuthService.register(dto.email, dto.password, dto.name);
        res
        .status(201)
        .json({ user_id: user.user_id, email: user.email, name: user.name });
    }

    static async login(req: Request, res: Response) {
        const dto = plainToInstance(LoginDto, req.body);
        await validateOrReject(dto);

        const token = await AuthService.login(dto.email, dto.password);
        res.json({ token });
    }
}