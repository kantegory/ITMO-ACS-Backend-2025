import { PartialType } from '@nestjs/swagger';
import { CreatePsychologistDto } from './createPsychologist.dto';

export class UpdatePsychologistDto extends PartialType(CreatePsychologistDto) {}
