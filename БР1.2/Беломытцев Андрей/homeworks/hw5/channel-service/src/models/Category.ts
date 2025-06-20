import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Channel } from './Channel'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Channel, channel => channel.category)
  channels: Channel[]
}