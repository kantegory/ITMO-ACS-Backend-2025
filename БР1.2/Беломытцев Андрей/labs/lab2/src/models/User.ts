import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { Channel } from './Channel'
import { Review } from './Review'
import { Role } from './Role'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255})
  password: string

  @CreateDateColumn()
  timeCreate: Date

  @Column({ 'nullable': true })
  about: string

  @ManyToOne(type => Role, role => role.users)
  role: Role

  @OneToMany(type => Review, review => review.user)
  reviews: Review[]

  @OneToMany(type => Channel, channel => channel.user)
  channels: Channel[]
}