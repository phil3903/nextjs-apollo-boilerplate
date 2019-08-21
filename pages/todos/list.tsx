import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { UserStats } from '../../components/Users'
import { TodoList } from '../../components/Todos'
import { Form, Input, SubmitButton } from '../../components/FormElements'
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
  const [createTodo] = useMutation(CREATE_TODO)
  const handleCreate = (data: any) => {
    createTodo({
      variables: {...data, dueDate: new Date()},
      refetchQueries: [{
        query: GET_TODOS,
        variables: {limit: 100}
      }]
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats name={user.name} createdDate={user.createdDate} />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList />
        </div>
        <div className="col-sm-3">
          <Form title={'Create'} onSubmit={handleCreate}>
            <Input name="title" placeholder={'Title'} />
            <Input name="description" placeholder={'Description'} />
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
