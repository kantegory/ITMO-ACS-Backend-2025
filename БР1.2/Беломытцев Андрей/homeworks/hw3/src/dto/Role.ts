import { Role } from '../models/Role'

export interface RoleDto {
  id: number
  name: string
}

export interface ExtraRoleDto extends RoleDto{
  users?: number[]
}

export function toRoleDto(role: Role): ExtraRoleDto {
  return {
    id: role.id,
    name: role.name,
    users: role.users?.map(user => user.id),
  }
}