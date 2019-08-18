import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user.model'
import { IBaseQuery, IContext } from 'types'
import { createToken } from '../server/auth'

/* Queries */

const login = async (
  _parent: any,
  { name, password }: { name: string; password: string },
) => {
  const userRepo = getRepository(User)
  const user = await userRepo.findOne({
    where: { name, password },
  })

  if (!user) throw new ApolloError('User Not Found')

  const isValid = bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new ApolloError('Wrong Password')
  }

  return createToken
}

const users = async (_parent: any, { limit = 10, page = 1 }: IBaseQuery) => {
  const userRepo = getRepository(User)
  const [users, totalCount] = await userRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  })

  const pageCount = Math.ceil(totalCount / limit)
  const count = users.length

  return {
    payload: users.map(user => ({ ...user, id: null })),
    totalCount,
    count,
    page,
    pageCount,
  }
}

/* Mutations */

const createUser = async (_parent: any, { name, password, photo }: IUser) => {
  console.log(_parent)
  const userRepo = getRepository(User)
  const user = await userRepo.create()
  user.name = name
  user.photo = photo
  user.password = await bcrypt.hash(password, 10)
  const newUser = await userRepo.save(user)
  return createToken(newUser)
}

const updateUser = async (
  _parent: any,
  { name, photo }: IUser,
  context: IContext,
) => {
  const userRepo = getRepository(User)
  const user = await userRepo.findOne(context.user.id)

  if (!user) {
    return new ApolloError('User does not exist')
  }

  user.name = name || user.name
  user.photo = photo || user.photo

  return await userRepo.save(user)
}

const removeUser = async (_parent: any, _variables: any, context: IContext) => {
  const userRepo = getRepository(User)
  const user = await userRepo.findOne(context.user.id)

  if (!user) {
    return new ApolloError('User does not exist')
  }

  return await userRepo.remove(user)
}

/* Resolver */

const UserResolver = {
  Query: {
    login,
    users,
  },
  Mutation: {
    createUser,
    updateUser,
    removeUser,
  },
}

export default UserResolver
