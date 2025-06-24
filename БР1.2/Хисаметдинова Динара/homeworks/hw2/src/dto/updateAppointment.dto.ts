import { AppointmentStatus } from '../enums/appointmentStatus.enum';

export class UpdateAppointmentDto {
  start_time?: Date;
  end_time?: Date;
  price?: number;
  status?: AppointmentStatus;
}
