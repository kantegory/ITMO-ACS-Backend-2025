import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm'

@Entity()
export class Video {
  @PrimaryColumn()
  id: string

  // @ManyToOne(type => Channel, channel => channel.videosList, { onDelete: 'CASCADE' })
  // channel: Channel
  @Column()
  channelId: string

  @Column()
  title: string

  @Column()
  publishedAt: Date

  @Column()
  thumbnail: string

  @Column('int', { nullable: true })
  length?: number

  @Column('bigint', { nullable: true })
  views?: number

  @Column()
  description: string
}