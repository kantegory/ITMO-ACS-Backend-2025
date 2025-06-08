import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theme: string;

  @Column()
  text: string;

  @Column('decimal', { nullable: true })
  recipient_id: number;
  
  @Column('decimal', { nullable: true })
  sender_id: number;

  @CreateDateColumn()
  created_at: Date;
}