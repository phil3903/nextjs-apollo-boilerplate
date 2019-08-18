import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user.model'
import { IBaseQuery, IContext } from 'types'
import { createToken } from '../server/auth'


/* Queries */

const users = async (_parent: any, { limit = 10, page = 1 }: IBaseQuery) => {
  const userRepo = getRepository(User)
  const [users, totalCount] = await userRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
  })

  const pageCount = Math.ceil(totalCount / limit)
  const count = users.length

  return {
    payload: users,
    totalCount,
    count,
    page,
    pageCount,
  }
}

/* Mutations */

const loginOrCreate = async (_parent: any, { name, password, photo }: IUser) => {
  try{
    if(!password) {
      return new ApolloError('No Password Provided')
    }

    const userRepo = getRepository(User)
    const user = await userRepo
      .createQueryBuilder('user')
      .where('user.name = :name', {name})
      .addSelect('user.password')
      .getOne()

    console.log(user)

    // If we find a user then validate
    if(user){
      const isValid = await bcrypt.compare(password, user.password)
      console.log(isValid)
      if (!isValid) {
        return new ApolloError('Wrong Password')
      }
      user.lastLoginDate = new Date()
      await userRepo.save(user)
      console.log(createToken(user))
      return user //createToken(user)
    }


    // Otherwise return our new user
    const newUser = await userRepo.create()
    newUser.name = name
    newUser.photo = photo
    newUser.lastLoginDate = new Date()
    newUser.password = await bcrypt.hash(password, 10)
    console.log(newUser)
    const savedUser = await userRepo.save(newUser)
    console.log(savedUser)
    return savedUser //createToken(savedUser)
  } catch (err) {
    return new ApolloError(err)
  }
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
    users,
  },
  Mutation: {
    loginOrCreate,
    updateUser,
    removeUser,
  },
}

export default UserResolver
