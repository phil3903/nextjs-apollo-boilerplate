import React from 'react'
import styled from '@emotion/styled'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { ITodo } from '../../models/todo.model'
import Todo from './Todo'

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $isComplete: Boolean){
    updateTodo(id: $id, isComplete: $isComplete){
      id
      isComplete
    }
  }
`

interface ITodoListProps {
  payload: ITodo[]
}

const TodoList = ({payload}: ITodoListProps) => {

  const [updateIsComplete] = useMutation(UPDATE_TODO)

  const handleClick = (id: string, isComplete: boolean) => {
    updateIsComplete({variables:{id, isComplete}})
  }

  return (
    <List>
      <Title>
        Todos
      </Title>
      <Scrollable>
      {payload.length 
        ? payload.map(({id, title, description, isComplete, dueDate}: ITodo) => (
          <Todo
            key={id}
            id={id}
            onClick={handleClick}
            isComplete={isComplete}
            title={title}
            description={description}
            dueDate={String(dueDate)}
          />
          ))
        : <PlaceholderText>You've Got Nothing To Do!</PlaceholderText> 
        }
      </Scrollable>
    </List>
  )
}

const Title = styled.h1`
  font-family: 'Poppins Light';
  font-weight: 300;
  font-size: 36px;
  height: 36px;
  margin: 0 0 24px 0;
  color: #fcfcfc;

`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: visible;
  max-height: 700px;
  min-height: 700px;
`

const PlaceholderText = styled.p`
  font-family: 'Poppins Light';
  color: rgba(252, 252, 252, 0.5);
`

export default TodoList