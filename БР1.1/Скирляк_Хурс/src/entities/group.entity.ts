import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/entity.interfaces';
import { User } from './user.entity';
@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, user => user.group)
  users: IUser[];
}
