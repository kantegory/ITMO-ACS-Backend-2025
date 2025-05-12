import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../models/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from '../dto/createAppointment.dto';
import { UpdateAppointmentDto } from '../dto/updateAppointment.dto';
import { User } from '../models/user.entity';
import { Psychologist } from '../models/psychologist.entity';

@Injectable()
export class AppointmentService {
  [x: string]: any;
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Psychologist)
    private readonly psychologistRepo: Repository<Psychologist>,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const client = await this.userRepo.findOneByOrFail({ id: dto.clientId });
    const psychologist = await this.psychologistRepo.findOneByOrFail({
      id: dto.psychologistId,
    });

    const appointment = this.appointmentRepo.create({
      client,
      psychologist,
      start_time: dto.start_time,
      end_time: dto.end_time,
      price: dto.price,
      status: dto.status ?? 'pending',
    });

    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return this.appointmentRepo.find({
      relations: { client: true, psychologist: true },
    });
  }

  findOne(id: number) {
    return this.appointmentRepo.findOne({
      where: { id },
      relations: { client: true, psychologist: true },
    });
  }
  async update(
    id: number,
    dto: UpdateAppointmentDto,
  ): Promise<Appointment | null> {
    await this.appointmentRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.appointmentRepo.delete(id);
  }
}
