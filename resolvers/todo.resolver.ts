import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import Todo, { ITodo } from '../models/todo.model'
import { IContext, IBaseQuery } from '../types'
import { authorizeToken } from '../lib/auth'
import User from '../models/user.model'

/* Queries */

const todo = async (_parent: any, { id }: { id: string }, { authorization }: IContext,) => {
  if (!authorization) return new ApolloError('Not logged in')
  const user = await authorizeToken(authorization)
  console.log(user)
  const todoRepo = getRepository(Todo)
  return await todoRepo.findOne(id)
}

const todos = async (
  _parent: any,
  { limit = 100, page = 1 }: IBaseQuery,
  { authorization }: IContext,
) => {
  console.log('get todos')
  if (!authorization) return new ApolloError('Not logged in')
  const user = await authorizeToken(authorization)
  const todoRepo = getRepository(Todo)
  const [payload, totalCount] = await todoRepo.findAndCount({
    where: {user: user.id}
  })

  const pageCount = Math.ceil(totalCount / limit)
  const count = payload.length

  return {
    payload,
    totalCount,
    count,
    page,
    pageCount,
  }
}

/* Mutations */

const createTodo = async (
  _parent: any,
  { dueDate, title, description }: ITodo,
  { authorization }: IContext,
) => {
  console.log('create todo')
  if (!authorization) return new ApolloError('Not logged in')
  const {id} = await authorizeToken(authorization)
  const userRepo = getRepository(User)
  const todoRepo = getRepository(Todo)

  const user = await userRepo.findOne({where: {id}})
  console.log(user)
  if(!user) return new ApolloError('Unable to find user')
  const todo = await todoRepo.create()
  todo.dueDate = dueDate
  todo.title = title
  todo.description = description
  todo.user = user
  return await todoRepo.save(todo)
}

const updateTodo = async (
  _parent: any,
  { id, isComplete, dueDate, title, description }: ITodo,
  { authorization }: IContext,
) => {
  if (!authorization) return new ApolloError('Not logged in')
  const token = authorizeToken(authorization)
  console.log(token)

  const todoRepo = getRepository(Todo)
  const todo = await todoRepo.findOne(id)

  if (!todo) {
    return new ApolloError('Todo does not exist')
  }

  todo.isComplete = isComplete || todo.isComplete
  todo.dueDate = dueDate || todo.dueDate
  todo.description = description || todo.description
  todo.title = title || todo.title

  return await todoRepo.save(todo)
}

const removeTodo = async (
  _parent: any, 
  { id }: { id: string },
  { authorization }: IContext,
) => {
  if (!authorization) return new ApolloError('Not logged in')
  const token = authorizeToken(authorization)
  console.log(token)

  const todoRepo = getRepository(Todo)
  const todo = await todoRepo.findOne(id)

  if (!todo) {
    return new ApolloError('Todo does not exist')
  }

  return await todoRepo.remove(todo)
}

/* Resolver */

const TodoResolver = {
  Query: {
    todo,
    todos,
  },
  Mutation: {
    createTodo,
    updateTodo,
    removeTodo,
  },
}

export default TodoResolver
