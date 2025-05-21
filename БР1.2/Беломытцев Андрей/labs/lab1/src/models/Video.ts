import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Video {
  @PrimaryColumn()
  id: string

  @Column()
  channel: string

  @Column()
  title: string

  @Column()
  publishedAt: Date

  @Column()
  thumbnail: string

  @Column('int')
  length: number

  @Column('bigint')
  views: number

  @Column()
  description: string
}