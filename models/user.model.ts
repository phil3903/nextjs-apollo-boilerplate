import { Entity, Column, OneToMany } from 'typeorm'
import { MinLength, MaxLength } from 'class-validator'

import BaseModel, { IBase } from './base.model'
import { ITodo } from './todo.model'
import Todo from './todo.model'

export interface IUser extends IBase {
  name: string
  password: string
  photo: string
  todos?: ITodo[]
}

@Entity()
export default class User extends BaseModel {
  @MinLength(3, {
    message:
      '$property is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @MaxLength(20, {
    message:
      '$property is too long. Max length is $constraint1 characters, but actual is $value',
  })
  @Column({ unique: true })
  name: string

  @Column()
  password: string

  @Column()
  photo: string

  @OneToMany(() => Todo, todo => todo.user)
  todos: Promise<Todo[]>
}
