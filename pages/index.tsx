import React from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { UserList, User } from '../components/Users'
import { Form, Input, SubmitButton } from '../components/FormElements'
import { Instructions } from '../components/Instructions'
import { IFormData } from '../components/FormElements/Form'
import { IUser } from '../models/user.model'
import cookie from 'cookie'

interface IClientUser extends IUser {
  isSelected: boolean
}

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

const Index = () => {
  const router = useRouter()
  const client = useApolloClient()
  const { loading, data } = useQuery(GET_USERS)
  const [loginOrCreate] = useMutation(LOGIN_OR_CREATE)
  const [setSelectedUser] = useMutation(SET_SELECTED_USER)

  const handleLogin = async (variables: IFormData[]) => {
    loginOrCreate({
      variables,
    })
      //onSuccess
      .then(res => {
        const {token, expiresIn} = res.data.loginOrCreate
        document.cookie = cookie.serialize('authorization', token, {
          maxAge: expiresIn
        })
        // Force a reload of all the current queries and redirect
        client.cache.reset().then(() => router.push('/todos/list'))
      })
      .catch(err => console.log(err))
  }

  const handleSetActiveUser = (name: string) => {
    setSelectedUser({
      variables: { name },
      refetchQueries: [{
        query: GET_USERS,
      }]  
    })
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
            {!loading && data.users.payload.map((user: IClientUser) => (
              <User 
                key={user.id} 
                name={user.name} 
                photo={user.photo} 
                isSelected={user.isSelected || false}
                onClick={()=> handleSetActiveUser(user.name)}
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
        <div className="col-xl-3" />
      </div>
    </>
  )
}

// Index.getInitialProps = async (context: any) => {
//   const { data } = await context.apolloClient.query({ query: GET_USERS })
//   return data
// }

export default Index
