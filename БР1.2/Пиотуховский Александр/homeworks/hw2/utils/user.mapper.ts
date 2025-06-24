import { User } from '../models/User';
import { UserResponseDTO } from '../dtos/user.dto';

export function toUserResponseDTO(user: User): UserResponseDTO {
    return {
        id:           user.id,
        username:     user.username,
        email:        user.email,
        firstName:    user.firstName ?? null,
        lastName:     user.lastName  ?? null,
        photoUrl:     user.photoUrl  ?? null,
        isMuted:      user.isMuted,
        isActive:     user.isActive,
        registeredAt: user.registeredAt,
        roleId:       user.role.id,
    };
}