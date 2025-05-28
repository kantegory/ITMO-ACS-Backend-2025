import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './createSchedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
