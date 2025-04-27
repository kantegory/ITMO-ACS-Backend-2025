import { User } from '../models/User';

/**
 * DTO for user creation
 */
export class CreateUserDto {
  /**
   * The user's full name
   * @example "John Doe"
   */
  name!: string;

  /**
   * The user's email address
   * @example "john.doe@example.com"
   */
  email!: string;

  /**
   * The user's password
   * @example "password123"
   */
  password!: string;
}

/**
 * DTO for user update
 */
export class UpdateUserDto {
  /**
   * The user's full name
   * @example "John Doe"
   */
  name?: string;

  /**
   * The user's email address
   * @example "john.doe@example.com"
   */
  email?: string;

  /**
   * The user's password
   * @example "password123"
   */
  password?: string;
}

/**
 * DTO for user response (excludes sensitive information)
 */
export class UserResponseDto {
  /**
   * The unique identifier for the user
   * @example 1
   */
  id!: number;

  /**
   * The user's full name
   * @example "John Doe"
   */
  name!: string;

  /**
   * The user's email address
   * @example "john.doe@example.com"
   */
  email!: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}

/**
 * DTO for user login
 */
export class LoginUserDto {
  /**
   * The user's email address
   * @example "john.doe@example.com"
   */
  email!: string;

  /**
   * The user's password
   * @example "password123"
   */
  password!: string;
}

/**
 * DTO for login response
 */
export class LoginResponseDto {
  /**
   * The JWT token for authentication
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  token!: string;

  /**
   * The user information
   */
  user!: UserResponseDto;
}