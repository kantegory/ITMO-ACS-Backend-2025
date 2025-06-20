import { Request, Response } from "express";
import { AppDataSource } from "../config/AppDataSource";
import { Roles } from "../models/Roles";

const roleRepository = AppDataSource.getRepository(Roles);

// Создание новой роли
export const createRole = async function (req: Request, res: Response) {
    try {
        const roleData = req.body;
        const role = roleRepository.create(roleData);
        const savedRole = await roleRepository.save(role);
        res.status(201).json(savedRole);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение всех ролей
export const getRoles = async function (_req: Request, res: Response) {
    try {
        const roles = await roleRepository.find();
        res.json(roles);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Получение одной роли по id
export const getRole = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const role = await roleRepository.findOneBy({id: id});
        if (!role) {
            return res.status(404).json({message: "Role not found"});
        }
        res.json(role);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Обновление роли
export const updateRole = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
        const result = await roleRepository.update(id, updatedData);
        if (result.affected === 0) {
            return res.status(404).json({message: "Role not found"});
        }
        res.json({message: "Role updated successfully"});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Удаление роли
export const deleteRole = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result = await roleRepository.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({message: "Role not found"});
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};
