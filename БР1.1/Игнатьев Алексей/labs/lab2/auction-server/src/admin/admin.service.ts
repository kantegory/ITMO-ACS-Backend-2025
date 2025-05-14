import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserParams } from './params/user.params';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllUsers(params: UserParams): Promise<UserEntity[]> {
    const { skip = 0, take = 10, is_bot, ...rest } = params;

    let where: any = { ...rest };

    if (is_bot === true) {
      where.bot = { NOT: null };
    } else if (is_bot === false) {
      where.bot = null;
    }

    return this.prisma.user.findMany({
      where,
      skip,
      take,
      include: {
        address: true,
      },
    });
  }
}
