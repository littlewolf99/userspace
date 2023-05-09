import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Post from "./Post";
import Friendship from "./Friendship";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    unique: true,
  })
  username: string;

  @Column({
    default: "",
  })
  password: string;

  @Column({
    length: 100,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
