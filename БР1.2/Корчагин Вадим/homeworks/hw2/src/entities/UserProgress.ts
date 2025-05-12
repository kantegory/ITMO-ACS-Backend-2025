import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    JoinColumn, UpdateDateColumn
  } from "typeorm"
  import { User } from "./User"
  
  @Entity("user_progress")
  export class UserProgress {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("int")
    user_id: number
  
    @ManyToOne(() => User, (user) => user.progress)
    @JoinColumn({ name: "user_id" })
    user: User
  
    @Column("numeric", { precision: 5, scale: 2, nullable: true }) 
    current_weight: number
  
    @Column("numeric", { precision: 5, scale: 2, nullable: true })
    target_weight: number
  
    @Column("int", { nullable: true }) 
    steps_walked: number
  
    @Column("numeric", { precision: 4, scale: 1, nullable: true })
    water_intake: number
  
    @UpdateDateColumn()
    updated_at: Date
  }
  