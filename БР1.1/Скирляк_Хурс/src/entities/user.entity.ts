// src/entities/user.entity.ts
import { Group } from './group.entity';
import { MovieMatch } from './movie-match.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password_hash: string;

  @ManyToOne(() => Group, group => group.users, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group?: Group;

  @Column({ type: 'uuid', nullable: true })
  group_id?: string;

  // Обратные связи для MovieMatch
  @OneToMany(() => MovieMatch, match => match.user1)
  matchesAsUser1: MovieMatch[];

  @OneToMany(() => MovieMatch, match => match.user2)
  matchesAsUser2: MovieMatch[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
