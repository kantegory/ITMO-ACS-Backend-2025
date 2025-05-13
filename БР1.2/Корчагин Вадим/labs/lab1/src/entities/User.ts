import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn
  } from "typeorm"
import { Role } from "./Role"
import { BlogPost } from "./BlogPost"
import { BlogComment } from "./BlogComment"
import { Order } from "./Order"
import { UserProgress } from "./UserProgress"
import { UserTrainingPlan } from "./UserTrainingPlan"
  
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  role_id: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role

  @Column("varchar", { length: 100 })
  name: string

  @Column("varchar", { length: 100 })
  email: string

  @Column("varchar", { length: 255 })
  password_hash: string

  @Column("date", { nullable: true })
  date_of_birth: Date

  @Column("varchar", { length: 10, nullable: true })
  gender: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => BlogPost, (post) => post.author)
  blogPosts: BlogPost[]

  @OneToMany(() => BlogComment, (comment) => comment.user)
  comments: BlogComment[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @OneToMany(() => UserProgress, (progress) => progress.user)
  progress: UserProgress[]

  @OneToMany(() => UserTrainingPlan, (plan) => plan.user)
  trainingPlans: UserTrainingPlan[]
}
