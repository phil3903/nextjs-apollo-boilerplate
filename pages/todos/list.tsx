import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { format } from 'date-fns'
import { UserStats } from '../../components/Users'
import { Todo, TodoList } from '../../components/Todos'
import { Form, Input, SubmitButton } from '../../components/FormElements'
import { IFormData } from '../../components/FormElements/Form'
import { IUser } from '../../models/user.model'
import { ITodo } from '../../models/todo.model'

export const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      createdDate
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

const Todos = ({ user }: {user: IUser}) => {
  const {loading, error, data} = useQuery(GET_TODOS, {
    variables: {limit: 100}
  })

  if (loading) return <pre>Loading...</pre>
  if (error) return <pre>Error! {error.message}</pre>

  const handleCreate = (data: IFormData[]) => {
    console.log(data)
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats
            name={user.name}
            createdDate={user.createdDate}
            todoCount={data.count}
          />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList title="Todos">
            {data.todos.payload.map((todo: ITodo) => (
              <Todo
                key={todo.id}
                isComplete={false}
                title="My Todo"
                date={format(new Date(), 'MMM do, YYYY')}
                description="This is the long form description"
              />
            ))}
          </TodoList>
        </div>
        <div className="col-sm-3">
          <Form title={'Create'} onSubmit={handleCreate}>
            <Input name="title" placeholder={'Title'} />
            <Input name="description" placeholder={'Description'} />
            <Input name="date" placeholder={'Due Date'} type="date" />
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
