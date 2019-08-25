import React,  { useState } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { UserList, User } from '../components/Users'
import { Form, Input, SubmitButton, StyledInput } from '../components/FormElements'
import { Instructions } from '../components/Instructions'
import { IFormData } from '../components/FormElements/Form'
import { IUser } from '../models/user.model'
import cookie from 'cookie'

// Query for User List
export const GET_USERS = gql`
  query GetUsers($page: Int, $limit: Int) {
    users(limit: $limit, page: $page) {
      totalCount
      count
      page
      pageCount
      payload {
        isSelected @client
        id
        createdDate
        updatedDate
        name
        photo
      }
    }
  }
`

// Mutation for Login or Create
const LOGIN_OR_CREATE = gql`
  mutation LoginOrCreate($name: String!, $password: String!, $photo: String) {
    loginOrCreate(name: $name, password: $password, photo: $photo) {
      expiresIn
      token
    }
  }
`

//  Mutation for Client-Side Mutation
const SET_SELECTED_USER = gql`
  mutation SetSelectedUser($name: String!) {
    setSelectedUser(name: $name) @client
  }
`

interface IClientUser extends IUser {
  isSelected: boolean
}

// React Component
const Index = (props: any) => {
  const router = useRouter()
  const client = useApolloClient()
  const { loading, data } = useQuery(GET_USERS)
  const [loginOrCreate] = useMutation(LOGIN_OR_CREATE)
  const [setSelectedUser] = useMutation(SET_SELECTED_USER)
  const [username, setUsername] = useState('')

  const handleLogin = async (variables: IFormData[]) => {
    try {
      const res = await loginOrCreate({
        variables: {...variables, name: username},
      })
      const {token, expiresIn} = res.data.loginOrCreate
      document.cookie = await cookie.serialize('authorization', token, {
        maxAge: expiresIn,
        path: '/'
      })
      client.cache.reset().then(() => router.replace('/todos/list'))
    } catch (err) {
      console.log(err)
    }
  }

  const handleSetActiveUser = (name: string) => {
    setSelectedUser({
      variables: { name },
      refetchQueries: [{
        query: GET_USERS,
      }],
    }).then(()=>{
      setUsername(name)
    })
  }

  const handleUsernameUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setSelectedUser({
      variables: { name },
      refetchQueries: [{
        query: GET_USERS,
      }],
    })
  }

  const users = !loading && data && data.users 
    ? data.users.payload 
    : props.users.payload

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <Instructions />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <UserList>
            {users.length 
              ? users.map((user: IClientUser) => (
                <User 
                  key={user.id} 
                  name={user.name} 
                  photo={user.photo} 
                  isSelected={user.isSelected || false}
                  onClick={()=> handleSetActiveUser(user.name)}
                />
              ))
              : <PlaceholderText>No users yet. Make an account!</PlaceholderText> 
            }
          </UserList>
        </div>
        <div className="col-sm-3">
          <Form title={'Login'} onSubmit={handleLogin}>
            <StyledInput 
              type="text"
              name="name" 
              placeholder="Name"
              value={ username }
              onChange={ handleUsernameUpdate }
            />
            <Input name="password" placeholder={'Password'} type="password" />
            <SubmitButton text={'Login'} />
          </Form>
        </div>
        <div className="col-xl-3" />
      </div>
    </>
  )
}

Index.getInitialProps = async (context: any) => {
  const INITIAL_USERS_QUERY = gql`
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
  const { data } = await context.apolloClient.query({ query: INITIAL_USERS_QUERY })
  return data
}

const PlaceholderText = styled.p`
  font-family: 'Poppins Light';
  color: rgba(252, 252, 252, 0.5);
`

export default Index
