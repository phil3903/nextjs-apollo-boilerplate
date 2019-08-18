import { IUser } from 'models/user.model'

export interface IContext {
  user: IUser
}

export interface IBaseQuery {
  limit: number,
  page: number
}