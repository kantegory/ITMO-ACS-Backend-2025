import { Injectable } from '@nestjs/common';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { PrismaClient } from '@prisma/client';
import { StatusOKDto } from './dto/status.dto';

@Injectable()
export abstract class CommonService<CommonEntity> {
  constructor(protected readonly prisma: PrismaClient) {}

  async findAll(params?: any, attr?: any): Promise<CommonEntity[]> {
    throw new Error('Method findAll not implemented.');
  }

  async findOne(id: number, attr?: any): Promise<CommonEntity | null> {
    throw new Error('Method findOne not implemented.');
  }

  async create(createDto: CreateCommonDto, attr?: any): Promise<CommonEntity> {
    throw new Error('Method create not implemented.');
  }

  async update(
    id: number,
    updateDto: UpdateCommonDto,
    attr?: any,
  ): Promise<CommonEntity> {
    throw new Error('Method update not implemented.');
  }

  async remove(id: number): Promise<StatusOKDto> {
    throw new Error('Method remove not implemented.');
  }
}
