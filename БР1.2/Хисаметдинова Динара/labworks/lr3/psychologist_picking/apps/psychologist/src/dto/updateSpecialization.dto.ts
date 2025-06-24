import { PartialType } from '@nestjs/swagger';
import { CreateSpecializationDto } from './createSpecialization.dto';

export class UpdateSpecializationDto extends PartialType(
  CreateSpecializationDto,
) {}
