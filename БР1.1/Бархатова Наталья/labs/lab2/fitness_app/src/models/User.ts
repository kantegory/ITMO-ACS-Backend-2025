import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { Post } from "./Post";
  import { Progress } from "./Progress";
  import { TrainingPlan } from "./TrainingPlan";
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
  
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
  
    @OneToMany(() => Progress, (progress) => progress.user)
    progress: Progress[];
  
    @OneToMany(() => TrainingPlan, (plan) => plan.user)
    trainingPlans: TrainingPlan[];
  }
  