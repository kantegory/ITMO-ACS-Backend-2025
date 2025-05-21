import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    CreateDateColumn, UpdateDateColumn
  } from "typeorm"
  import { Order } from "./Order"
  
  @Entity("payments")
  export class Payment {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("int")
    order_id: number
  
    @ManyToOne(() => Order, (order) => order.payments)
    @JoinColumn({ name: "order_id" })
    order: Order
  
    @Column("varchar", { length: 50 })
    payment_method: string
  
    @Column("varchar", { length: 50 }) 
    payment_status: string
  
    @Column("varchar", { length: 100, nullable: true })
    transaction_id: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  }
  