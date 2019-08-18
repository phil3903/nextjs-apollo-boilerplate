import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import Todo, { ITodo } from '../models/todo.model'
import { IContext, IBaseQuery } from '../types'

/* Queries */

const todo = async (_parent: any, { id }: { id: string }) => {
  const todoRepo = getRepository(Todo)
  return await todoRepo.findOne(id)
}

const todos = async (
  _parent: any,
  { limit = 10, page = 1 }: IBaseQuery,
  { user }: IContext,
) => {
  if (!user) return null

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
) => {
  console.log(_parent)
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
) => {
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

const removeTodo = async (_parent: any, { id }: { id: string }) => {
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
