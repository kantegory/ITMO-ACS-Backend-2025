import { Body, Controller, Get, Path, Put, Route, Security, Tags, Query } from 'tsoa';
import { AppDataSource } from '../data-source';
import { User } from '../models/User';
import { UpdateUserDto, UserResponseDto } from '../dtos/UserDto';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Get a user by ID
   */
  @Get('{userId}')
  public async getUserById(@Path() userId: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    return new UserResponseDto(user);
  }

  /**
   * Get a user by email
   */
  @Get()
  public async getUserByEmail(@Query() email?: string): Promise<UserResponseDto | UserResponseDto[]> {
    // If email is provided, find user by email
    if (email) {
      const user = await this.userRepository.findOne({
        where: { email }
      });

      if (!user) {
        this.setStatus(404);
        throw new Error('User not found');
      }

      return new UserResponseDto(user);
    }

    // Otherwise, return all users
    const users = await this.userRepository.find();
    return users.map(user => new UserResponseDto(user));
  }

  /**
   * Update a user
   */
  @Put('{userId}')
  @Security('jwt')
  public async updateUser(
    @Path() userId: number,
    @Body() requestBody: UpdateUserDto
  ): Promise<UserResponseDto> {
    // Get the authenticated user from the request
    const authenticatedUserId = (this.request as any).user.id;

    // Check if the authenticated user is trying to update their own profile
    if (authenticatedUserId !== userId) {
      this.setStatus(403);
      throw new Error('You can only update your own profile');
    }

    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    // Update user fields
    if (requestBody.name) {
      user.name = requestBody.name;
    }

    if (requestBody.email) {
      // Check if email is already taken
      const existingUser = await this.userRepository.findOne({
        where: { email: requestBody.email }
      });

      if (existingUser && existingUser.id !== userId) {
        this.setStatus(400);
        throw new Error('Email is already taken');
      }

      user.email = requestBody.email;
    }

    if (requestBody.password) {
      // Hash the new password
      const bcrypt = require('bcrypt');
      user.password = await bcrypt.hash(requestBody.password, 10);
    }

    // Save updated user
    await this.userRepository.save(user);

    return new UserResponseDto(user);
  }
}