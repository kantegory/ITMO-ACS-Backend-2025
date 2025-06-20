import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from "typeorm";

  import { UserDetails } from "./UserDetails";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: "varchar", length: 255, unique: true })
    email: string;
  
    @Column({ type: "varchar", length: 255})
    password: string;
  
    @Column({ type: "varchar", length: 255, unique: true })
    username: string;
  
    @OneToOne(() => UserDetails, (details) => details.user, { cascade: true })
    @JoinColumn()
    details: UserDetails;
  }
  