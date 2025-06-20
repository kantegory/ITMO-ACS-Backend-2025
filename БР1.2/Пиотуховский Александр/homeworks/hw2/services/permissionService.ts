import { AppDataSource } from '../config/data-source';
import { Permission } from '../models/Permission';
import { CreatePermissionDTO, UpdatePermissionDTO } from '../dtos/permission.dto';

const permissionRepository = AppDataSource.getRepository(Permission);

export async function getAllPermissions(): Promise<Permission[]> {
    return permissionRepository.find();
}

export async function getPermissionById(id: number): Promise<Permission> {
    const perm = await permissionRepository.findOne({ where: { id } });
    if (!perm) throw new Error('Permission not found');
    return perm;
}

export async function getPermissionByAction(action: string): Promise<Permission> {
    const perm = await permissionRepository.findOne({ where: { action } });
    if (!perm) throw new Error('Permission not found');
    return perm;
}

export async function createPermission(data: CreatePermissionDTO): Promise<Permission> {
    const existing = await permissionRepository.findOne({ where: { action: data.action } });
    if (existing) throw new Error('Permission already exists');
    const perm = permissionRepository.create({
        action: data.action,
        description: data.description ?? null,
        requiredRank: data.requiredRank,
    });
    return permissionRepository.save(perm);
}

export async function updatePermission(id: number, data: UpdatePermissionDTO): Promise<Permission> {
    const perm = await getPermissionById(id);
    if (data.action !== undefined && data.action !== perm.action) {
        const dup = await permissionRepository.findOne({ where: { action: data.action } });
        if (dup && dup.id !== id) throw new Error('Permission action already in use');
        perm.action = data.action;
    }
    if (data.description !== undefined) perm.description = data.description;
    if (data.requiredRank !== undefined) perm.requiredRank = data.requiredRank;
    return permissionRepository.save(perm);
}

export async function deletePermission(id: number): Promise<void> {
    const result = await permissionRepository.delete(id);
    if (!result.affected) throw new Error('Permission not found');
}