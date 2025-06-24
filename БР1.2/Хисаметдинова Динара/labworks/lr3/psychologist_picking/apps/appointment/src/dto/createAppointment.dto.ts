//import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AppointmentStatus } from '../enums/appointmentStatus.enum';

export class CreateAppointmentDto {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  psychologistId: number;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: string;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional({ enum: AppointmentStatus })
  status?: AppointmentStatus;
}
