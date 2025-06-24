import { User } from '../models/User'

export interface UserDto {
  id: number
  username: string
  email: string
  timeCreate: Date
  about?: string
  role?: number
  channels?: string[]
  reviews?: number[]
}

export interface CreateUserDto {
  username: string
  email: string
  password: string
  about?: string
}

export interface LoginUserDto {
  username: string
  password: string
}

export function toUserDto(user: User): UserDto {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    timeCreate: user.timeCreate,
    about: user.about,
    role: user.role?.id,
    channels: user.channels?.map(channel => channel.id),
    reviews: user.reviews?.map(review => review.id),
  }
}