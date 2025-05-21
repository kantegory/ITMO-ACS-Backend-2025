import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { Channel } from './Channel'
import { User } from './User'

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Channel, channel => channel.reviews)
  channel: Channel

  @ManyToOne(type => User, user => user.reviews)
  user: User

  @CreateDateColumn()
  timeCreate: Date

  @Column()
  text: string

  @Column('int')
  rate: number
}