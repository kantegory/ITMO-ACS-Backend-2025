import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { CreateCommonDto } from './dto/create-common.dto';
import { UpdateCommonDto } from './dto/update-common.dto';
import { ICommonControllerFactoryOpts } from './common.interface';
import { StatusOKDto } from './dto/status.dto';

export function commonControllerFactory<CommonEntity>(
  options: ICommonControllerFactoryOpts<CommonEntity>,
) {
  const Entity = options.entity;
  abstract class CommonController {
    commonService: CommonService<CommonEntity>;
    constructor(service: CommonService<CommonEntity>) {
      this.commonService = service;
    }
    async findAll?(params?: any, arg?: any): Promise<CommonEntity[]> {
      throw new Error('Method findAll not implemented.');
    }
    async findOne?(
      @Param('id') id: number,
      arg?: any,
    ): Promise<CommonEntity | null> {
      throw new Error('Method findOne not implemented.');
    }

    async create?(
      createCommonDto: CreateCommonDto,
      arg?: any,
    ): Promise<CommonEntity> {
      throw new Error('Method create not implemented.');
    }
    async update?(
      @Param('id') id: number,
      @Body() updateCommonDto: UpdateCommonDto,
      arg?: any,
    ): Promise<CommonEntity> {
      throw new Error('Method update not implemented.');
    }
    async remove?(@Param('id') id: number): Promise<StatusOKDto> {
      throw new Error('Method delete not implemented.');
    }
  }
  return CommonController;
}
