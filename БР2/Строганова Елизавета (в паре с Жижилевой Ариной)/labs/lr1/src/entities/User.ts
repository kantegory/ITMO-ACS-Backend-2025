import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BlogPost } from "./BlogPost";
import { UserMeasurementsProgress } from "./UserMeasurementsProgress";
import { UserWorkoutProgress } from "./UserWorkoutProgress";
import { PostComment } from "./PostComment";
import { PostLike } from "./PostLike";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  registration_date!: Date;

  @Column()
  age!: number;

  @Column()
  gender!: string;

  @Column("float")
  weight!: number;

  @Column("float")
  height!: number;

  @OneToMany(() => BlogPost, (post) => post.user)
  blogPosts!: BlogPost[];

  @OneToMany(() => PostComment, (comment) => comment.user)
  comments!: PostComment[];

  @OneToMany(() => PostLike, (like) => like.user)
  likes!: PostLike[];

  @OneToMany(() => UserMeasurementsProgress, (progress) => progress.user)
  measurementsProgress!: UserMeasurementsProgress[];

  @OneToMany(() => UserWorkoutProgress, (progress) => progress.user)
  workoutProgress!: UserWorkoutProgress[];
}
