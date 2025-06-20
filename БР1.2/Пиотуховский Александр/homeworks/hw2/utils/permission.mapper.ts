import { Permission } from '../models/Permission';
import { PermissionResponseDTO } from '../dtos/permission.dto';

export function toPermissionResponseDTO(permission: Permission): PermissionResponseDTO {
    return {
        id: permission.id,
        action: permission.action,
        description: permission.description ?? null,
        requiredRank: permission.requiredRank,
    };
}