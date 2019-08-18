import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const TOKEN_EXPIRATION = 60 * 60 // one hour
const JWT_SECRET = process.env.JWT_SECRET

interface IUserToken {
  id: string,
  name: string
}

export const createToken = (user: User) => {
  if (!JWT_SECRET || !JWT_SECRET.length) {
    throw Error('Missing JWT_SECRET')
  }

  const serialize: IUserToken = {
    id: user.id,
    name: user.name
  }

  return {
    expiresIn: TOKEN_EXPIRATION,
    token: jwt.sign(serialize, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION }),
  }
}

export const authorizeToken = (token: string) => {
  if (!JWT_SECRET || !JWT_SECRET.length) {
    throw Error('Missing JWT_SECRET')
  }

  return jwt.verify(token, JWT_SECRET)
}