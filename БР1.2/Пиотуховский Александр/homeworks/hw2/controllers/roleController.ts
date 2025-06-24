import { RequestHandler } from 'express';
import * as roleService from '../services/roleService';
import { toRoleResponseDTO } from '../utils/role.mapper';
import { CreateRoleDTO, UpdateRoleDTO } from '../dtos/role.dto';

export const listRolesController: RequestHandler = async (_req, res, next) => {
    try {
        const roles = await roleService.getAllRoles();
        res.json(roles.map(toRoleResponseDTO));
    } catch (err) {
        next(err);
    }
};

export const getRoleByIdController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const role = await roleService.getRoleById(id);
        res.json(toRoleResponseDTO(role));
    } catch (err) {
        if (err instanceof Error && err.message === 'Role not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const getRoleByNameController: RequestHandler = async (req, res, next) => {
    try {
        const name = req.params.name;
        const role = await roleService.getRoleByName(name);
        res.json(toRoleResponseDTO(role));
    } catch (err) {
        if (err instanceof Error && err.message === 'Role not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const createRoleController: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body as CreateRoleDTO;
        const newRole = await roleService.createRole(data);
        res.status(201).json(toRoleResponseDTO(newRole));
    } catch (err) {
        if (err instanceof Error && err.message === 'Role already exists') {
            res.status(400).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const updateRoleController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body as UpdateRoleDTO;
        const updatedRole = await roleService.updateRole(id, data);
        res.json(toRoleResponseDTO(updatedRole));
    } catch (err) {
        if (err instanceof Error && (err.message === 'Role not found' || err.message === 'Role name already in use')) {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const deleteRoleController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await roleService.deleteRole(id);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && err.message === 'Role not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};
