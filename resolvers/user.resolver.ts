import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user.model'
import { IBaseQuery, IContext } from 'types'
import { createToken, authorizeToken } from '../lib/auth'

/* Queries */

const user = async (_parent: any, _variables: any, {authorization}: IContext) => {
  try {
    if(!authorization) {
      return new ApolloError('You are not authorized')
    }

    const {id} = await authorizeToken(authorization)
    const userRepo = getRepository(User)
    const user = userRepo.findOne({id})
    return user
    
  } catch(err){
    return new ApolloError(err)
  }
}

const users = async (_parent: any, { limit = 10, page = 1 }: IBaseQuery) => {
  try {
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
  catch (err) {
    return new ApolloError(err)
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

    // If we find a user then validate
    if(user){
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        return new ApolloError('Wrong Password')
      }
      user.lastLoginDate = new Date()
      const savedUser = await userRepo.save(user)
      const authorization = createToken(savedUser)
      console.log(authorization)
      console.log(await authorizeToken(authorization.token))
      return authorization
    }

    // Otherwise return our new user
    const newUser = await userRepo.create()
    newUser.name = name
    newUser.photo = photo
    newUser.lastLoginDate = new Date()
    newUser.password = await bcrypt.hash(password, 10)
    const savedUser = await userRepo.save(newUser)

    const authorization = createToken(savedUser)
    return authorization
  } catch (err) {
    console.log(err)
    return new ApolloError(err)
  }
}


const updateUser = async (
  _parent: any,
  { name, photo }: IUser,
  { authorization }: IContext,
) => {
  if (!authorization) return new ApolloError('Not logged in')
  const {id} = await authorizeToken(authorization)
  console.log(id)

  const userRepo = getRepository(User)
  const user = await userRepo.findOne('context.user.id')

  if (!user) {
    return new ApolloError('User does not exist')
  }

  user.name = name || user.name
  user.photo = photo || user.photo

  return await userRepo.save(user)
}

const removeUser = async (
  _parent: any, 
  _variables: any, 
  { authorization }: IContext
) => {
  if (!authorization) return new ApolloError('Not logged in')
  const token = authorizeToken(authorization)
  console.log(token)

  const userRepo = getRepository(User)
  const user = await userRepo.findOne('context.user.id')

  if (!user) {
    return new ApolloError('User does not exist')
  }

  return await userRepo.remove(user)
}

/* Resolver */

const UserResolver = {
  Query: {
    user,
    users,
  },
  Mutation: {
    loginOrCreate,
    updateUser,
    removeUser,
  },
}

export default UserResolver
