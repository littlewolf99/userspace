import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
  })
  content: string;

  @Column({
    type: "timestamp",
    update: false,
  })
  postedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;
}
