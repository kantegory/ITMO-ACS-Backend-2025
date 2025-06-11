import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaClient, RewardType } from '@prisma/client';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateUserTaskDto } from './dto/create-task.dto';
import { UpdateUserTaskDto } from './dto/update-task.dto';
import { UserTaskEntity } from './entities/user-task.entity';
@Injectable()
export class UserTasksService {
  constructor(private readonly prisma: PrismaClient) {}

  async completeTask(id: number, userId: number): Promise<UserTaskEntity> {
    const ratoTask = await this.prisma.ratoTask.findUnique({
      where: { rato_task_id: id },
    });
    if (!ratoTask) {
      throw new NotFoundException('Rato task not found');
    }
    const userTask = await this.prisma.userTask.findFirst({
      where: { task_id: id, user_id: userId, completed_at: { not: null } },
    });
    if (userTask) {
      throw new BadRequestException('Task already completed');
    }

    return await this.prisma.$transaction(
      async (tx) => {
        if (ratoTask?.reward_type === RewardType.FREE_SPIN) {
          await tx.user.update({
            where: { user_id: userId },
            data: { free_spin_amount: { increment: ratoTask.reward_amount } },
          });
        }
        if (ratoTask?.reward_type === RewardType.RATO) {
          await tx.user.update({
            where: { user_id: userId },
            data: { rato_balance: { increment: ratoTask.reward_amount } },
          });
        }
        return await tx.userTask.create({
          data: {
            user_id: userId,
            task_id: id,
            completed_at: new Date(),
          },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    );
  }

  async getTasks(params: PaginateParams): Promise<UserTaskEntity[]> {
    const { skip = 0, take = 10 } = params;
    return this.prisma.userTask.findMany({
      skip,
      take,
      include: {
        task: true,
      },
    });
  }
  async getTaskById(id: number): Promise<UserTaskEntity> {
    const task = await this.prisma.userTask.findUnique({
      where: { user_task_id: id },
      include: {
        task: true,
      },
    });
    if (!task) {
      throw new NotFoundException('User task not found');
    }
    return task;
  }
  async createUserTask(data: CreateUserTaskDto): Promise<UserTaskEntity> {
    return this.prisma.userTask.create({ data });
  }

  async updateUserTask(
    id: number,
    data: UpdateUserTaskDto,
  ): Promise<UserTaskEntity> {
    return this.prisma.userTask.update({ where: { user_task_id: id }, data });
  }

  async deleteUserTask(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.userTask.delete({ where: { user_task_id: id } });
      return new StatusOKDto();
    } catch (error) {
      throw new NotFoundException('User task not found');
    }
  }
}
