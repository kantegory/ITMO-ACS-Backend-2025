import { User } from './user.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('friend_requests')
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'from_user_id' })
  from_user: User;

  @Column({ type: 'uuid' })
  from_user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'to_user_id' })
  to_user: User;

  @Column({ type: 'uuid' })
  to_user_id: string;

  @CreateDateColumn()
  created_at: Date;
}
