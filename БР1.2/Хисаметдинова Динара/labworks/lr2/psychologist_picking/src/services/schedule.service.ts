import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from '../models/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from '../dto/createSchedule.dto';
import { UpdateScheduleDto } from '../dto/updateSchedule.dto';
import { Psychologist } from '../models/psychologist.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly repo: Repository<Schedule>,
    @InjectRepository(Psychologist)
    private readonly psychRepo: Repository<Psychologist>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['psychologist'] });
  }

  async create(dto: CreateScheduleDto) {
    const psychologist = await this.psychRepo.findOneByOrFail({
      id: dto.psychologistId,
    });
    const record = this.repo.create({ ...dto, psychologist });
    return this.repo.save(record);
  }

  async update(id: number, dto: UpdateScheduleDto) {
    await this.repo.update(id, dto);
    return this.repo.findOne({ where: { id }, relations: ['psychologist'] });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
