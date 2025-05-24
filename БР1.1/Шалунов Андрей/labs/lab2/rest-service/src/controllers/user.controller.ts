import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/types';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class UserController {
    static async create(req: Request, res: Response) {
        const dto = plainToInstance(CreateUserDto, req.body);
        await validateOrReject(dto);
        const user = await UserService.createUser(dto);
        res.status(201).json(user);
    }

    static async findAll(_: Request, res: Response) {
        const list = await UserService.getAllUsers();
        res.json(list);
    }

    static async findOne(req: Request, res: Response) {
        const id = Number(req.params.id);
        const user = await UserService.getUserById(id);
        if (!user) {
            const err: any = new Error('User not found');
            err.status = 404;
            throw err;
        }
        res.json(user);
    }

    static async findByEmail(req: Request, res: Response) {
        const email = req.query.email;
        if (typeof email !== 'string') {
            const err: any = new Error('Email query parameter required');
            err.status = 400;
            throw err;
        }
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            const err: any = new Error('User not found');
            err.status = 404;
            throw err;
        }
        res.json(user);
    }

    static async findMe(req: AuthRequest, res: Response) {
        if (!req.user) {
            const err: any = new Error('Unauthorized');
            err.status = 401;
            throw err;
        }
        const user = await UserService.getUserById(req.user.userId);
        if (!user) {
            const err: any = new Error('User not found');
            err.status = 404;
            throw err;
        }
        res.json(user);
    }

    static async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const dto = plainToInstance(UpdateUserDto, req.body);
        await validateOrReject(dto);
        const updated = await UserService.updateUser(id, dto);
        res.json(updated);
    }

    static async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await UserService.deleteUser(id);
        res.sendStatus(204);
    }
}