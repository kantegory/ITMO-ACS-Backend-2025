import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { CurrentProgress } from './CurrentProgress';
import { Gender } from '../enums/Gender';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number; 

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: Gender, 
    nullable: true
  })
  gender?: Gender;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @OneToOne(() => CurrentProgress, (currentProgress) => currentProgress.user, { onDelete: 'CASCADE' })
  currentProgress!: CurrentProgress;
}