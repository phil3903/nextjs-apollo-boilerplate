import { getRepository } from 'typeorm'
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/user.model'
import { IBaseQuery, IContext } from 'types'
import { createToken, authorizeToken, authorizeUser } from '../lib/auth'

/* Queries */

const user = async (_parent: any, _variables: any, {authorization}: IContext) => {
  try {
    return await authorizeUser(authorization)
  } catch(err){
    throw new ApolloError(err)
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
    throw new ApolloError(err)
  }
}

/* Mutations */

const loginOrCreate = async (_parent: any, { name, password, photo }: IUser) => {
  try{
    if(!password) {
      throw new AuthenticationError('No Password Provided')
    }

    const userRepo = getRepository(User)
    const user = await userRepo.createQueryBuilder('user')
      .where('user.name = :name', {name})
      .addSelect('user.password')
      .getOne()

    // If we find a user then validate
    if(user){
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        throw new AuthenticationError('Wrong Password')
      }
      user.lastLoginDate = new Date()
      const savedUser = await userRepo.save(user)
      const authorization = createToken(savedUser)
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
    throw new ApolloError(err)
  }
}


const updateUser = async (
  _parent: any,
  { name, photo }: IUser,
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const userRepo = getRepository(User)

    user.name = name || user.name
    user.photo = photo || user.photo

    return await userRepo.save(user)
  } 
  catch(err){
    throw new ApolloError(err)
  }
}

const removeUser = async (
  _parent: any, 
  _variables: any, 
  { authorization }: IContext
) => {
  try {
    const {id} = await authorizeToken(authorization)
    const userRepo = getRepository(User)
    const user = await userRepo.findOne({
      where: {id},
      relations: ['todos']
    })

    if(!user) {
      throw new AuthenticationError('Unable to find user')
    }

    if (user.id === id){
      const deletedUser = await userRepo.remove(user)
      return {...deletedUser, id: 'deleted'}
    } 
    else {
      throw new ApolloError("Nope, this ain't you!")
    } 
  }
  catch(err) {
    throw new ApolloError(err)
  }
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
