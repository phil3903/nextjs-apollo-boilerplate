import {gql, InMemoryCache} from 'apollo-boost'
import { ITodo } from '../../models/todo.model'

const GET_ACTIVE_TODOS = gql`
  query GetActiveTodos {
    activeTodos @client
  }
`

interface ActiveTodosResult {
  activeTodos: string[]
}

const todoResolver = {
  Mutation:{
    toggleActiveTodos: (
      _:any, 
      {id}: {id: string}, 
      {cache}: {cache: InMemoryCache}
    ) =>{
    
      const activeTodos = cache.readQuery<ActiveTodosResult>({query: GET_ACTIVE_TODOS})!.activeTodos
      const index = activeTodos.indexOf(id)

      let next = []
      if(index < 0){
        next = [...activeTodos, id]
      } else {
        next = [...activeTodos.slice(0, index), ...activeTodos.slice(index + 1)]
      }

      cache.writeData({
        data: {
          activeTodos: next
        }
      })
      return null
    }
  },
  Todo: {
    isActive: (todo: ITodo, _variables:any,  {cache}:{cache: InMemoryCache}) =>{
      const activeTodos = cache.readQuery<ActiveTodosResult>({query: GET_ACTIVE_TODOS})!.activeTodos
      return activeTodos.includes(todo.id)
    }
  },
}

export default todoResolver