import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../../user/src/user/user.entity';
import { PsychologistSpecialization } from '../specialization/psychologist_specialization.entity';

@Entity('psychologists')
export class Psychologist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  experience: number;

  @Column()
  bio: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'decimal' })
  price_per_hour: number;

  @OneToMany(() => PsychologistSpecialization, (ps) => ps.psychologist, {
    cascade: true,
  })
  specializations: PsychologistSpecialization[];
}
