import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  recipe_id: number;

  @Column("text")
  text: string;

  @CreateDateColumn({select: false})
  createdAt: Date;
}
