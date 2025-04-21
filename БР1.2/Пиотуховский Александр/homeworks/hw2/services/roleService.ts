import { AppDataSource } from '../config/data-source';
import { Role } from '../models/Role';
import { CreateRoleDTO, UpdateRoleDTO } from '../dtos/role.dto';

const roleRepository = AppDataSource.getRepository(Role);

export async function getAllRoles(): Promise<Role[]> {
    return roleRepository.find();
}

export async function getRoleById(id: number): Promise<Role> {
    const role = await roleRepository.findOne({ where: { id } });
    if (!role) throw new Error('Role not found');
    return role;
}

export async function getRoleByName(name: string): Promise<Role> {
    const role = await roleRepository.findOne({ where: { name } });
    if (!role) throw new Error('Role not found');
    return role;
}

export async function createRole(data: CreateRoleDTO): Promise<Role> {
    const existing = await roleRepository.findOne({ where: { name: data.name } });
    if (existing) throw new Error('Role already exists');
    const role = roleRepository.create({
        name: data.name,
        rank: data.rank,
        isDefault: data.isDefault ?? false,
    });
    return roleRepository.save(role);
}

export async function updateRole(id: number, data: UpdateRoleDTO): Promise<Role> {
    const role = await getRoleById(id);
    if (data.name !== undefined) {
        const dup = await roleRepository.findOne({ where: { name: data.name } });
        if (dup && dup.id !== id) throw new Error('Role name already in use');
        role.name = data.name;
    }
    if (data.rank !== undefined) role.rank = data.rank;
    if (data.isDefault !== undefined) role.isDefault = data.isDefault;
    return roleRepository.save(role);
}

export async function deleteRole(id: number): Promise<void> {
    const result = await roleRepository.delete(id);
    if (!result.affected) throw new Error('Role not found');
}