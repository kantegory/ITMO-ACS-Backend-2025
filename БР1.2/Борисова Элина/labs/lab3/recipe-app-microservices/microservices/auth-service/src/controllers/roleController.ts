import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Role } from '../models/Role';

const roleRepository = AppDataSource.getRepository(Role);

export const createRole = async function(req: Request, res: Response) {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.length > 50) {
        res.status(400).json({ message: 'Invalid or missing name' });
        return;
    }

    const entity = roleRepository.create({ name });
    const saved = await roleRepository.save(entity);

    const result = await roleRepository
    .createQueryBuilder('role')
    .select(['role.id', 'role.name'])
    .where('role.id = :id', { id: saved.id })
    .getOne();

    res.status(201).json(result);
};

export const getRoles = async function(_req: Request, res: Response) {
    const list = await roleRepository
    .createQueryBuilder('role')
    .select(['role.id', 'role.name'])
    .getMany();

    res.json(list);
};

export const getRole = async function(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const item = await roleRepository
        .createQueryBuilder('role')
        .select(['role.id', 'role.name'])
        .where('role.id = :id', { id })
        .getOne();

        if (!item) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.json(item);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRole = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (name && (typeof name !== 'string' || name.length > 50)) {
        res.status(400).json({ message: 'Invalid name' });
        return;
    }

    const result = await roleRepository.update(id, { name });
    if (result.affected === 0) {
        res.status(404).json({ message: 'Role not found' });
        return;
    }
    res.json({ message: 'Role updated successfully' });
};

export const deleteRole = async function(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await roleRepository.delete(id);
    if (result.affected === 0) {
        res.status(404).json({ message: 'Role not found' });
        return;
    }
    res.status(204).send();
};
