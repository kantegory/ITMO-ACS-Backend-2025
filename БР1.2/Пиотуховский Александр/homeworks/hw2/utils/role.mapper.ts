import { Role } from '../models/Role';
import { RoleResponseDTO } from '../dtos/role.dto';

export function toRoleResponseDTO(role: Role): RoleResponseDTO {
    return {
        id: role.id,
        name: role.name,
        rank: role.rank,
        isDefault: role.isDefault,
    };
}