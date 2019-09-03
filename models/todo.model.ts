import { Entity, Column, ManyToOne } from 'typeorm'

import BaseModel, { IBase } from './base.model'
import User, { IUser } from './user.model'

export interface ITodo extends IBase {
  isComplete: boolean
  dueDate: Date
  title: string
  description: string
  user: IUser
}

@Entity()
export default class Todo extends BaseModel {
  @Column({ default: false })
  isComplete: boolean

  @Column()
  dueDate: Date

  @Column()
  title: string

  @Column()
  description: string

  @ManyToOne(() => User, (user) => user.todos, {
    eager: true, //loads automatically
    nullable: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User
}
