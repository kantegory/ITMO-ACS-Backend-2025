import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcryptjs';

import { User } from '../../entities/user.entity';
import { UserProfileDto } from '../users/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { nickname } });
  }

  async create(userData: {
    email: string;
    nickname: string;
    password: string;
  }): Promise<User> {
    const user = this.usersRepository.create({
      ...userData,
      password_hash: await bcrypt.hash(userData.password, 10),
    });
    return this.usersRepository.save(user);
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.findOne(userId);
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      created_at: user.created_at,
      updated_at: user.updated_at,
      matchesAsUser1: user.matchesAsUser1,
      matchesAsUser2: user.matchesAsUser2,
      group: user.group,
      group_id: user.group_id,
      // is_2fa_enabled: user.is_2fa_enabled,
      // google_2fa_secret: user.google_2fa_secret,
    };
  }
  // async update2FASecret(userId: string, secret: string): Promise<void> {
  //   await this.usersRepository.update(userId, {
  //     google_2fa_secret: secret,
  //   });
  // }

  // async enable2FA(userId: string): Promise<void> {
  //   await this.usersRepository.update(userId, {
  //     is_2fa_enabled: true,
  //   });
  // }

  // async disable2FA(userId: string): Promise<void> {
  //   await this.usersRepository.update(userId, {
  //     is_2fa_enabled: false,
  //     google_2fa_secret: undefined,
  //   });
  // }
}
