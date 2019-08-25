import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Router from 'next/router'
import { UserStats } from '../../components/Users'
import { TodoList } from '../../components/Todos'
import { Form, SubmitButton, StyledInput } from '../../components/FormElements'
import { IUser } from '../../models/user.model'


const addTimezoneOffset = (dateString: string) => {
  const date = new Date(dateString)
  const timeOffsetInMS = date.getTimezoneOffset() * 60000;
  const dateWithOffset = date.setTime(date.getTime() + timeOffsetInMS)
  return new Date(dateWithOffset)
}

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      createdDate
    }
  }
`

export const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String!
    $dueDate: Date!
  ) {
    createTodo(
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      id
      title
      description
      isComplete
    }
  }
`

export const GET_TODOS = gql`
  query GetTodos($limit: Int){
    todos(limit: $limit){
      totalCount
      payload {
        id
        title
        description
        dueDate
        isComplete
      }
    }
  }
`

const Todos = ({ user }: { user: IUser }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [createTodo] = useMutation(CREATE_TODO)
  const {loading, data} = useQuery(GET_TODOS, {
    variables: {limit: 100}
  })

  const handleCreate = () => {
    createTodo({
      variables: {
        title,
        description,
        dueDate: addTimezoneOffset(dueDate)
      },
      refetchQueries: [{
        query: GET_TODOS,
        variables: {limit: 100}
      }]
    }).then(() => {
      setTitle('')
      setDescription('')
      setDueDate('')
    })
  }

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleDueDateUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTimezoneOffset(e.target.value)
    setDueDate(e.target.value)
  }

  if (loading) return <pre>Loading...</pre>
  
  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats 
            name={user.name} 
            createdDate={String(user.createdDate)} 
            todoCount={data.todos.totalCount}
          />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList
            payload={data.todos.payload}
          />
        </div>
        <div className="col-sm-3">
          <Form 
            title={'Create'} 
            onSubmit={handleCreate}
          >
            <StyledInput 
                type="text"
                name="title" 
                placeholder="Title"
                value={ title }
                onChange={ handleTitleUpdate }
              />
              <StyledInput 
                type="text"
                name="description" 
                placeholder="Description"
                value={ description }
                onChange={ handleDescriptionUpdate }
              />
              <StyledInput 
                type="date"
                name="dueDate" 
                placeholder="Date"
                value={ dueDate }
                onChange={ handleDueDateUpdate }
              />
            <SubmitButton text={'Create Todo'} />
          </Form>
        </div>
        <div className="col-xl-3" />
      </div>
    </>
  )
}

Todos.getInitialProps = async (context: any) => {
  try {
    const { data } = await context.apolloClient.query({ query: GET_USER })
    return data || {}
  } catch (err) {
    const { res } = context 
    if(res) {
      res.writeHead(302, { Location: '/'})
      res.end()
    } else  {
      Router.replace('/')
    }
  }
}

export default Todos
