import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psychologist } from '../models/psychologist.entity';
import { PsychologistSpecialization } from '../models/psychologist_specialization.entity';
import { User } from '../models/user.entity';
import { PsychologistController } from '../controllers/psychologist.controller';
import { PsychologistService } from '../services/psychologist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Psychologist, PsychologistSpecialization, User]),
  ],
  controllers: [PsychologistController],
  providers: [PsychologistService],
})
export class PsychologistModule {}
