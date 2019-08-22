import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { UserStats } from '../../components/Users'
import { TodoList } from '../../components/Todos'
import { Form, SubmitButton, StyledInput } from '../../components/FormElements'
//import { IFormData } from '../../components/FormElements/Form'
import { IUser } from '../../models/user.model'
import { GET_TODOS } from '../../components/Todos/TodoList'

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

const Todos = ({ user }: { user: IUser }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [createTodo] = useMutation(CREATE_TODO)

  const handleCreate = () => {
    createTodo({
      variables: {
        title,
        description,
        dueDate: new Date()
      },
      refetchQueries: [{
        query: GET_TODOS,
        variables: {limit: 100}
      }]
    }).then(() => {
      setTitle('')
      setDescription('')
    })
  }

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats 
            name={user.name} 
            createdDate={String(user.createdDate)} 
          />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList />
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
            <SubmitButton text={'Create Todo'} />
          </Form>
        </div>
        <div className="col-xl-3" />
      </div>
    </>
  )
}

// Typescript no-no's - /lib/init-apollo.js & with-apollo-client.js
// need to be addressed.
Todos.getInitialProps = async (context: any) => {
  const { data } = await context.apolloClient.query({ query: GET_USER })
  return data || {}
}

export default Todos
