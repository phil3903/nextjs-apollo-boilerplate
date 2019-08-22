import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { AuthenticationError } from 'apollo-server-express'
import User from '../models/user.model'

const TOKEN_EXPIRATION = 3600 // one hour
const JWT_SECRET = process.env.JWT_SECRET

export interface IUserToken {
  id: string,
  name: string
}

export interface IJwtResponse {
  expiresIn: number,
  token: string
}

export const createToken = ({id, name}: User): IJwtResponse => {
  if (!JWT_SECRET || !JWT_SECRET.length) {
    throw Error('Missing JWT_SECRET')
  }
  
  return {
    expiresIn: TOKEN_EXPIRATION,
    token: jwt.sign({id,name}, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }),
  }
}

export const authorizeToken = async (authorization: string): Promise<IUserToken> => {
  if (!JWT_SECRET || !JWT_SECRET.length) {
    throw Error('Missing JWT_SECRET')
  }

  // Typescript no-no's - probably shouldn't cast to anything
  const token = await jwt.verify(authorization, JWT_SECRET) as IUserToken
  return {id: token.id, name: token.name}
}

export const authorizeUser = async (authorization: string): Promise<User> => {
  if (!authorization) {
    throw new AuthenticationError('Not logged in')
  }
  const {id} = await authorizeToken(authorization)

  if(!id) {
    throw new AuthenticationError('User not authorized')
  }

  const userRepo = getRepository(User)
  const user = await userRepo.findOne({where: {id}})

  if(!user) {
    throw new AuthenticationError('Unable to find user')
  }

  return user
}