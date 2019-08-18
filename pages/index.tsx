import React from 'react'
//import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
//import styled from '@emotion/styled'
import { UserList, User } from '../components/Users'
import { Form, Input, SubmitButton } from '../components/FormElements'
import { Instructions } from '../components/Instructions'
import { IFormData } from '../components/FormElements/Form'
import { IUser } from '../models/user.model'

export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int) {
    users(limit: $limit, page: $page) {
      totalCount
      count
      page
      pageCount
      payload {
        id
        createdDate
        updatedDate
        name
        photo
      }
    }
  }
`

const LOGIN_OR_CREATE = gql`
  mutation LoginOrCreate(
    $name: String!
    $password: String!
    $photo: String
  ) {
    loginOrCreate(
      name: $name
      password: $password
      photo: $photo
    ) {
      id
      name
    }
  }
`

const Index = (props:any) => {
  //const router = useRouter()
  const [loginOrCreate] = useMutation(LOGIN_OR_CREATE)

  const handleLogin = (variables: IFormData[]) => {
    console.log(variables)
    loginOrCreate({
      variables
    })
    //router.push('/todos/list')
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <Instructions />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <UserList>
            {props.users.payload.map((user: IUser) => (
              <User 
                key={user.id}
                name={user.name}
                photo={user.photo} 
              />
            ))}
          </UserList>
        </div>
        <div className="col-sm-3">
          <Form title={'Login'} onSubmit={handleLogin}>
            <Input name="name" placeholder={'Name'} />
            <Input name="password" placeholder={'Password'} type="password" />
            <SubmitButton text={'Login'} />
          </Form>
        </div>
        <div className="col-lg-3" />
      </div>
    </>
  )
}

Index.getInitialProps = async (context:any) => {
  const { data } = await context.apolloClient.query({ query: GET_USERS })
  return data
}

export default Index
