import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Property } from './Property';

export enum BookingRequestStatus {
  CREATED = 'created',
  ACTIVE = 'active',
  CANCELED = 'canceled',
  ACCEPTED = 'accepted',
}

@Entity()
export class BookingRequest {
  @PrimaryGeneratedColumn({ name: 'request_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.bookingRequests)
  @JoinColumn({ name: 'tenant_id' })
  tenant: User;

  @ManyToOne(() => Property, (property) => property.bookingRequests)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column('date', { name: 'requested_start_date' })
  requestedStartDate: Date;

  @Column('date', { name: 'requested_end_date' })
  requestedEndDate: Date;

  @Column('varchar', { default: BookingRequestStatus.CREATED })
  status: BookingRequestStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
