import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Psychologist } from './psychologist.entity';
import { PsychologistSpecialization } from '../specialization/psychologist_specialization.entity';
import { User } from '../../../user/src/user/user.entity';
import { PsychologistController } from './psychologist.controller';
import { PsychologistService } from './psychologist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Psychologist, PsychologistSpecialization, User]),
  ],
  controllers: [PsychologistController],
  providers: [PsychologistService],
})
export class PsychologistModule {}
