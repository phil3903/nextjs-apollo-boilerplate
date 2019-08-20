import jwt from 'jsonwebtoken'
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

  
  const token = await jwt.verify(authorization, JWT_SECRET)
  console.log(token)
  
  return {id: '', name: ''}
}