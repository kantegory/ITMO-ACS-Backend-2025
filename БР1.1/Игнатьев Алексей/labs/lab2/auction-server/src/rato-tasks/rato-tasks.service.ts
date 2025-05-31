import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  Prisma,
  PrismaClient,
  RatoTask,
  RatoTaskType,
  RewardType,
} from '@prisma/client';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { RatoTaskEntity } from './entities/rato-task.entity';
@Injectable()
export class RatoTasksService {
  constructor(private readonly prisma: PrismaClient) {}

  async getRatoTasks(
    params: PaginateParams,
    userId?: number,
  ): Promise<RatoTaskEntity[]> {
    const { skip = 0, take = 10 } = params;

    if (userId) {
      const tasks = await this.prisma.ratoTask.findMany({
        skip,
        take,
        include: {
          user_tasks: {
            where: {
              user_id: userId,
              completed_at: { not: null },
            },
          },
        },
      });

      return tasks.map(({ user_tasks, ...task }) => ({
        ...task,
        is_completed: user_tasks.length > 0,
      }));
    }

    return this.prisma.ratoTask.findMany({ skip, take });
  }
  async getRatoTaskById(id: number): Promise<RatoTask> {
    const task = await this.prisma.ratoTask.findUnique({
      where: { rato_task_id: id },
    });
    if (!task) {
      throw new NotFoundException('Rato task not found');
    }
    return task;
  }
  async createRatoTask(data: CreateTaskDto): Promise<RatoTask> {
    return this.prisma.ratoTask.create({ data });
  }
  async updateRatoTask(id: number, data: UpdateTaskDto): Promise<RatoTask> {
    return this.prisma.ratoTask.update({
      where: { rato_task_id: id },
      data,
    });
  }

  async deleteRatoTask(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.ratoTask.delete({ where: { rato_task_id: id } });
      return new StatusOKDto();
    } catch (error) {
      throw new NotFoundException('Rato task not found');
    }
  }
}
