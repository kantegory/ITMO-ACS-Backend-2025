import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from './specialization.entity';
import { Repository } from 'typeorm';
import { CreateSpecializationDto } from '../dto/createSpecialization.dto';
import { UpdateSpecializationDto } from '../dto/updateSpecialization.dto';

@Injectable()
export class SpecializationService {
  constructor(
    @InjectRepository(Specialization)
    private readonly repo: Repository<Specialization>,
  ) {}

  async findAll(): Promise<Specialization[]> {
    return this.repo.find();
  }

  async create(dto: CreateSpecializationDto): Promise<Specialization> {
    const spec = this.repo.create(dto);
    return this.repo.save(spec);
  }

  async update(
    id: number,
    dto: UpdateSpecializationDto,
  ): Promise<Specialization> {
    const spec = await this.repo.findOneBy({ id });
    if (!spec) throw new NotFoundException('Specialization not found');
    Object.assign(spec, dto);
    return this.repo.save(spec);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
