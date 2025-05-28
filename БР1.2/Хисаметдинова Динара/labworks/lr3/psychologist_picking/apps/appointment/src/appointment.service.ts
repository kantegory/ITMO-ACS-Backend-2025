import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/updateAppointment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @Inject('USERS_AUTH_SERVICE') private usersClient: ClientProxy,
    @Inject('PSYCHOLOGISTS_SERVICE') private psychologistsClient: ClientProxy,
  ) {}

  async create(dto: CreateAppointmentDto) {
    const appointment = this.appointmentRepo.create({
      ...dto,
      status: dto.status ?? 'pending',
    });
    return this.appointmentRepo.save(appointment);
  }

  findAll() {
    return this.appointmentRepo.find();
  }

  findOne(id: number) {
    return this.appointmentRepo.findOneBy({ id });
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

  async getClientInfo(clientId: number): Promise<any> {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'get-user-by-id' }, clientId),
    );
  }

  async getPsychologistInfo(psychologistId: number): Promise<any> {
    return firstValueFrom(
      this.psychologistsClient.send(
        { cmd: 'get-psychologist-by-id' },
        psychologistId,
      ),
    );
  }
}
