import { getRepository } from 'typeorm'
import { ApolloError } from 'apollo-server-express'
import Todo, { ITodo } from '../models/todo.model'
import { IContext, IBaseQuery } from '../types'
import { authorizeUser } from '../lib/auth'


/* Queries */

const todo = async (_parent: any, { id }: { id: string }, { authorization }: IContext,) => {
  try {
  const user = await authorizeUser(authorization)
  const todoRepo = getRepository(Todo)
  return await todoRepo.findOne({where: {id, user}})
  }
  catch(err){
    throw new ApolloError(err)
  }
}

const todos = async (
  _parent: any,
  { limit = 100, page = 1 }: IBaseQuery,
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const todoRepo = getRepository(Todo)
    const [payload, totalCount] = await todoRepo.findAndCount({
      where: {user},
      order: {
        dueDate: "DESC", 
        isComplete: "ASC"
      }
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
  catch (err) {
    throw new ApolloError(err)
  }
}

/* Mutations */

const createTodo = async (
  _parent: any,
  { dueDate, title, description }: ITodo,
  { authorization }: IContext,
) => {
  try{
    const user = await authorizeUser(authorization)
    const todoRepo = getRepository(Todo)
    const todo = await todoRepo.create()
    todo.dueDate = dueDate
    todo.title = title
    todo.description = description
    todo.user = user
    return await todoRepo.save(todo)
  }
  catch (err) {
    throw new ApolloError(err)
  }
}

const updateTodo = async (
  _parent: any,
  { id, isComplete, dueDate, title, description }: ITodo,
  { authorization }: IContext,
) => {
  try {
    await authorizeUser(authorization)
    const todoRepo = getRepository(Todo)
    const todo = await todoRepo.findOne({where: {id}})

    if (!todo) {
      throw new ApolloError('Todo does not exist')
    }

    todo.isComplete = isComplete != null ? isComplete : todo.isComplete
    todo.dueDate = dueDate || todo.dueDate
    todo.description = description || todo.description
    todo.title = title || todo.title

    return await todoRepo.save(todo)
  }
  catch (err) {
    throw new ApolloError(err)
  }
}

const removeTodo = async (
  _parent: any, 
  { id }: { id: string },
  { authorization }: IContext,
) => {
  try {
    const user = await authorizeUser(authorization)
    const todoRepo = getRepository(Todo)
    const todo = await todoRepo.findOne({where: {id, user}})

    if (!todo) {
      throw new ApolloError('Todo does not exist')
    }

    return await todoRepo.remove(todo)
  }
  catch (err) {
    throw new ApolloError(err)
  }
}

const removeCompleteTodos = async(
  _parent: any, _variables: any, { authorization }: IContext) => {
  try {
    const user = await authorizeUser(authorization)
    const todoRepo = getRepository(Todo)

    const todos = await todoRepo.find({
      where: {user, isComplete: true}
    })

    const ids = todos.map(todo => todo.id)
    await todoRepo.remove(todos)
    return ids
  }
  catch(err) {
    throw new ApolloError(err)
  }
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
    removeCompleteTodos
  },
}

export default TodoResolver
