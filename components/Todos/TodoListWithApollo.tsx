import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import styled from "@emotion/styled"
import { ITodo } from '../../models/todo.model'

interface IClientTodo extends ITodo {
  isActive: boolean
}

export const GET_TODOS = gql`
  query GetTodos($page: Int, $limit: Int) {
    todos(limit: $limit, page: $page) {
      totalCount
      count
      page
      pageCount
      payload {
        isActive @client
        id
        isComplete
        dueDate
        title
        description
      }
    }
  }
`

const TOGGLE_ACTIVE_TODO = gql`
  mutation ToggleActiveTodo($id: String!) {
    toggleActiveTodo(id: $id) @client
  }
`

const TodoList = () => {
  const { loading, data, error } = useQuery( //fetchMore: fetchMoreTodos
    GET_TODOS
  )
  const [setTodoActive] = useMutation(TOGGLE_ACTIVE_TODO)

  if (loading) return <pre>Loading...</pre>
  if (error) return <pre>Error! {error.message}</pre>

  // const handlePageClick = (page: number = 1) => {
  //   fetchMoreTodos({
  //     variables: { page },
  //     updateQuery: (_prev, { fetchMoreResult }) => {
  //       return fetchMoreResult
  //     }
  //   })
  // }

  const handleToggleActive = (id: string) => {
    setTodoActive({
      variables: { id },
      refetchQueries: [
        {
          query: GET_TODOS,
          variables: {
            page: data.todos.page
          }
        }
      ]
    })
  }

  return (
    <UL>
      {data.todos.payload.map((todo: IClientTodo) => (
        <li key={todo.id}>
          <Button onClick={() => handleToggleActive(todo.id)}>
            <p>isActive: {String(todo.isActive)}</p>
            <p>id: {todo.id}</p>
            <p>title: {todo.title}</p>
            <p>isComplete: {todo.isComplete}</p>
            <p>description: {todo.description}</p>
          </Button>
        </li>
      ))}
    </UL>
  )
}

export default TodoList

const UL = styled.ul`
  list-style: none;
`

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 33%;
  cursor: pointer;
`
