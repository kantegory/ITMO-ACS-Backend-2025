import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateWinItemDto } from './dto/create-win-item.dto';
import { UpdateWinItemDto } from './dto/update-win-item.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { FortuneWinEntity } from './entities/fortune-win.entity';

@Injectable()
export class FortuneWinsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(
    params: PaginateParams,
    userId: number,
  ): Promise<FortuneWinEntity[]> {
    const { skip = 0, take = 10 } = params;
    return this.prisma.fortuneWins.findMany({
      where: { user_id: userId },
      include: { spin_item: true },
      skip,
      take,
    });
  }

  async create(data: CreateWinItemDto) {
    // Проверяем существование пользователя
    const user = await this.prisma.user.findUnique({
      where: { user_id: data.user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.user_id} not found`);
    }

    // Проверяем существование spin_item
    const spinItem = await this.prisma.spinItem.findUnique({
      where: { spin_item_id: data.spin_item_id },
    });

    if (!spinItem) {
      throw new NotFoundException(
        `Spin item with ID ${data.spin_item_id} not found`,
      );
    }

    return this.prisma.fortuneWins.create({
      data,
    });
  }

  async update(id: number, data: UpdateWinItemDto) {
    return this.prisma.fortuneWins.update({
      where: { fortune_win_id: id },
      include: { spin_item: true },
      data,
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    await this.prisma.fortuneWins.delete({
      where: { fortune_win_id: id },
    });
    return new StatusOKDto();
  }
}
