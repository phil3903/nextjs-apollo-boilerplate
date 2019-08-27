import React, { useState } from 'react'
import styled from '@emotion/styled'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Dropdown, DropdownOption } from '../Dropdown'
import { ITodo } from '../../models/todo.model'
import { GET_TODOS } from '../../pages/todos/list'
import Todo from './Todo'

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $isComplete: Boolean){
    updateTodo(id: $id, isComplete: $isComplete){
      id
      isComplete
    }
  }
`

export const REMOVE_COMPLETE_TODOS = gql`
  mutation RemoveCompleteTodos{
    removeCompleteTodos
  }
`

interface ITodoListProps {
  payload: ITodo[]
}

const TodoList = ({payload}: ITodoListProps) => {

  const [updateIsComplete] = useMutation(UPDATE_TODO)
  const [removeCompleteTodos] = useMutation(REMOVE_COMPLETE_TODOS)
  const [isVisible, setDropdownVisiblity] = useState(false) 

  const handleClearCompleted = () => {
    setDropdownVisiblity(false)
    removeCompleteTodos({
      variables: {isComplete: true},
      refetchQueries: [{
          query: GET_TODOS,
          variables: {limit: 100}
      }] 
    })
  }

  const handleClick = (id: string, isComplete: boolean) => {
    updateIsComplete({variables:{id, isComplete}})
  }

  return (
    <List>
      <Heading>
        <Title>
          Todos
        </Title>
        <IconButton id="dropdown-button" onClick={() => setDropdownVisiblity(!isVisible)}>
          <FiMoreHorizontal 
            size={28}
            color={'#fcfcfc'}
          />
        </IconButton>
        <Dropdown isVisible={ isVisible }>
          <DropdownOption
            text={'Clear Completed'}
            onClick={ handleClearCompleted }
          />
        </Dropdown>
      </Heading>
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
  margin: 0;
  color: #fcfcfc;
`

const IconButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
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