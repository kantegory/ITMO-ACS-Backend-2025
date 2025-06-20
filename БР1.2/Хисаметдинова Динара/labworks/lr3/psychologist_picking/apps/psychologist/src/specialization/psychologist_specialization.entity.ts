import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Psychologist } from '../psychologist/psychologist.entity';
import { Specialization } from './specialization.entity';

@Entity('psychologist_specializations')
export class PsychologistSpecialization {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Psychologist, (p) => p.specializations)
  psychologist: Psychologist;

  @ManyToOne(() => Specialization)
  specialization: Specialization;
}
