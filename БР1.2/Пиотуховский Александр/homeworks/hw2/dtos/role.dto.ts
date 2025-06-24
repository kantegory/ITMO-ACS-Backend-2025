export interface RoleResponseDTO {
    id: number;
    name: string;
    rank: number;
    isDefault: boolean;
}

export interface CreateRoleDTO {
    name: string;
    rank: number;
    isDefault?: boolean;
}

export interface UpdateRoleDTO {
    name?: string;
    rank?: number;
    isDefault?: boolean;
}