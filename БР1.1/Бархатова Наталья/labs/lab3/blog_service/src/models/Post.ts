import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user: string;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column("text")
  text: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  published_at: Date;
}
