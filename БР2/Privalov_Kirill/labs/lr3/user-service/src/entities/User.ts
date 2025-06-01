import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ type: 'text', nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ type: 'text', nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', nullable: false, name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'text', unique: true, nullable: false })
  phone: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ type: 'enum', enum: UserRole, nullable: false, default: UserRole.TENANT })
  role: UserRole;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
