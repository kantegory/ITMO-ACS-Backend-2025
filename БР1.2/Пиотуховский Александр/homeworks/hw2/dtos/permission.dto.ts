export interface PermissionResponseDTO {
    id: number;
    action: string;
    description?: string | null;
    requiredRank: number;
}

export interface CreatePermissionDTO {
    action: string;
    description?: string;
    requiredRank: number;
}

export interface UpdatePermissionDTO {
    action?: string;
    description?: string;
    requiredRank?: number;
}