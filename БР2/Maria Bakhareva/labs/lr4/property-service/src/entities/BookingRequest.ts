import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
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

  @Column({ type: 'int', name: 'tenant_id' })
  tenantId: number;

  @ManyToOne(() => Property, (property) => property.bookingRequests)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'int', name: 'property_id' })
  propertyId: number;

  @Column({ type: 'date', name: 'requested_start_date' })
  requestedStartDate: Date;

  @Column({ type: 'date', name: 'requested_end_date' })
  requestedEndDate: Date;

  @Column({ type: 'text', default: BookingRequestStatus.CREATED })
  status: BookingRequestStatus;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;
}
