import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import Todo, { ITodo } from '../models/todo.model'
import { IContext, IBaseQuery } from '../types'
import { authorizeToken } from '../lib/auth'

/* Queries */

const todo = async (_parent: any, { id }: { id: string }, { authorization }: IContext,) => {
  if (!authorization) return new ApolloError('Not logged in')
  const todoRepo = getRepository(Todo)
  return await todoRepo.findOne(id)
}

const todos = async (
  _parent: any,
  { limit = 10, page = 1 }: IBaseQuery,
  { authorization }: IContext,
) => {
  if (!authorization) return new ApolloError('Not logged in')

  const todoRepo = getRepository(Todo)
  const [payload, totalCount] = await todoRepo.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
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
  { isComplete, dueDate, title, description }: ITodo,
  { authorization }: IContext,
) => {
  console.log(_parent)
  if (!authorization) return new ApolloError('Not logged in')
  const token = authorizeToken(authorization)
  console.log(token)

  const todoRepo = getRepository(Todo)
  const todo = await todoRepo.create()
  todo.isComplete = isComplete
  todo.dueDate = dueDate
  todo.title = title
  todo.description = description
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
