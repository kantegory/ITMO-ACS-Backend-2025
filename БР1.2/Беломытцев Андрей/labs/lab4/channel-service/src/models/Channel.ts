import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Review } from './Review'
import { Category } from './Category'
import { Theme } from './Theme'

@Entity()
export class Channel {
  @PrimaryColumn()
  id: string

  @Column()
  url: string

  @Column()
  title: string

  @Column('bigint')
  views: number

  @Column('int')
  subs: number

  @Column('int')
  videos: number

  @Column()
  lang: string

  @ManyToOne(type => Category, category => category.channels)
  category: Category

  @ManyToOne(type => Theme, theme => theme.channels)
  theme: Theme

  @Column()
  iconDefault: string

  @Column()
  iconMedium: string

  @Column()
  iconHigh: string

  @Column()
  description: string

  @Column()
  isApproved: boolean

  // @ManyToOne(type => User, user => user.channels)
  // user: User
  @Column()
  userId: number

  @CreateDateColumn()
  timeCreate: Date

  @UpdateDateColumn()
  timeUpdate: Date

  @OneToMany(type => Review, review => review.channel)
  reviews: Review[]

  // @OneToMany(type => Video, video => video.channel, {
  //   cascade: true
  // })
  // videosList: Video[]
}