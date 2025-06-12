import { Request, Response } from 'express';
import { RoleRepository } from '../repositories/roleRepository';

export class RoleController {
    private roleRepo: RoleRepository;

    constructor() {
        this.roleRepo = new RoleRepository();
    }

    async createRole(req: Request, res: Response) {
        const { name } = req.body;
        const role = await this.roleRepo.createRole(name);
        res.status(201).json(role);
    }
}