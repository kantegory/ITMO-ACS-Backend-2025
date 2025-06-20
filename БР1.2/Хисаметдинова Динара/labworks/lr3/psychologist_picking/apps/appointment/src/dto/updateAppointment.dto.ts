import { AppointmentStatus } from '../enums/appointmentStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @ApiProperty()
  start_time?: Date;

  @ApiProperty()
  end_time?: Date;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  status?: AppointmentStatus;
}
