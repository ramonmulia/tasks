import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
  import { User } from "./User";
  
  export enum TaskStatus {
      TO_DO = 'TO_DO',
      IN_PROGRESS = 'IN_PROGRESS',
      DONE = 'DONE',
      ARCHIVED = 'ARCHIVED'
  }

  @Entity("tasks")
  export class Task extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
  
    @Column("varchar", { length: 100 })
    title: string;
  
    @Column("varchar", { length: 100 })
    description: string;
  
    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.TO_DO
    })
    status: TaskStatus;
  
    @Column("uuid") userId: string;
  
    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
    user: User;
  }