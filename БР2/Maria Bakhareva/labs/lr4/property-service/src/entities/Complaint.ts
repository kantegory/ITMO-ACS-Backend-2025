import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Property } from './Property';

export enum ComplaintStatus {
  CREATED = 'created',
  INSPECTING = 'inspecting',
  RESOLVED = 'resolved',
  DENIED = 'denied',
}

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn({ name: 'complaint_id' })
  id: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Property, (property) => property.complaints)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: ComplaintStatus, default: ComplaintStatus.CREATED })
  status: ComplaintStatus;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;
}
