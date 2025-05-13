import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany
  } from "typeorm"
  import { Payment } from "./Payment"
  
  @Entity("orders")
  export class Order {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("int")
    user_id: number
  
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
  