import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psychologist } from '../models/psychologist.entity';
import { CreatePsychologistDto } from '../dto/createPsychologist.dto';
import { UpdatePsychologistDto } from '../dto/updatePsychologist.dto';
import { User } from '../models/user.entity';

@Injectable()
export class PsychologistService {
  constructor(
    @InjectRepository(Psychologist)
    private readonly psychologistRepo: Repository<Psychologist>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePsychologistDto): Promise<Psychologist> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const psychologist = this.psychologistRepo.create({
      user,
      experience: dto.experience,
      bio: dto.bio,
      price_per_hour: dto.price_per_hour,
    });

    return this.psychologistRepo.save(psychologist);
  }

  findAll(): Promise<Psychologist[]> {
    return this.psychologistRepo.find({
      relations: ['user', 'specializations'],
    });
  }

  findOne(id: number): Promise<Psychologist | null> {
    return this.psychologistRepo.findOne({
      where: { id },
      relations: ['user', 'specializations'],
    });
  }

  async update(
    id: number,
    dto: UpdatePsychologistDto,
  ): Promise<Psychologist | null> {
    await this.psychologistRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.psychologistRepo.delete(id);
  }
}
