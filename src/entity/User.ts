import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert
} from "typeorm";

import { Task } from "./Task";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("varchar", { length: 100, unique: true })
  email: string;

  @Column("varchar", {length: 250}) 
  password: string;

  @OneToMany(() => Task, task => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}