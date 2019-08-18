import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export interface IBase {
  id: string
  createdDate: Date
  updatedDate: Date
}

export default abstract class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}
