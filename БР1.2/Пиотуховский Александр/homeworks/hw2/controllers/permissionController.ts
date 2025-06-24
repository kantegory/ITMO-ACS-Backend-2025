import { RequestHandler } from 'express';
import * as permissionService from '../services/permissionService';
import { toPermissionResponseDTO } from '../utils/permission.mapper';
import { CreatePermissionDTO, UpdatePermissionDTO } from '../dtos/permission.dto';

export const listPermissionsController: RequestHandler = async (_req, res, next) => {
    try {
        const perms = await permissionService.getAllPermissions();
        res.json(perms.map(toPermissionResponseDTO));
    } catch (err) {
        next(err);
    }
};

export const getPermissionByIdController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const perm = await permissionService.getPermissionById(id);
        res.json(toPermissionResponseDTO(perm));
    } catch (err) {
        if (err instanceof Error && err.message === 'Permission not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const getPermissionByActionController: RequestHandler = async (req, res, next) => {
    try {
        const action = req.params.action;
        const perm = await permissionService.getPermissionByAction(action);
        res.json(toPermissionResponseDTO(perm));
    } catch (err) {
        if (err instanceof Error && err.message === 'Permission not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const createPermissionController: RequestHandler = async (req, res, next) => {
    try {
        const data = req.body as CreatePermissionDTO;
        const newPerm = await permissionService.createPermission(data);
        res.status(201).json(toPermissionResponseDTO(newPerm));
    } catch (err) {
        if (err instanceof Error && err.message === 'Permission already exists') {
            res.status(400).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const updatePermissionController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const data = req.body as UpdatePermissionDTO;
        const updated = await permissionService.updatePermission(id, data);
        res.json(toPermissionResponseDTO(updated));
    } catch (err) {
        if (err instanceof Error && (err.message === 'Permission not found' || err.message === 'Permission action already in use')) {
            const status = err.message === 'Permission not found' ? 404 : 400;
            res.status(status).json({ message: err.message });
            return;
        }
        next(err);
    }
};

export const deletePermissionController: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await permissionService.deletePermission(id);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error && err.message === 'Permission not found') {
            res.status(404).json({ message: err.message });
            return;
        }
        next(err);
    }
};