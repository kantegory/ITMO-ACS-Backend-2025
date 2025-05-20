import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany
  } from "typeorm"
  import { User } from "./User"
  import { Payment } from "./Payment"
  
  @Entity("orders")
  export class Order {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("int")
    user_id: number
  
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: User
  
    @Column("numeric", { precision: 10, scale: 2 })
    total_amount: number
  
    @Column("varchar", { length: 10, default: "USD" })
    currency: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[]
  }
  