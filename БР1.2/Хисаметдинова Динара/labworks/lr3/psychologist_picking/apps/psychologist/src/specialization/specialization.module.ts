import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization } from '../../../psychologist/src/specialization/specialization.entity';
import { SpecializationService } from './specialization.service';
import { SpecializationController } from './specialization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specialization])],
  controllers: [SpecializationController],
  providers: [SpecializationService],
  exports: [SpecializationService],
})
export class SpecializationModule {}
