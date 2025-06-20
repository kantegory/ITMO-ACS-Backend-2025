export interface UserResponseDTO {
    id: number;
    username: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    photoUrl?: string | null;
    isMuted: boolean;
    isActive: boolean;
    registeredAt: Date;
    roleId: number;
}

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface UpdateUserDTO {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
}