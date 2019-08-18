import React from 'react'
import { useRouter } from 'next/router'
import { gql } from 'apollo-boost'
//import styled from '@emotion/styled'
import { UserList, User } from '../components/Users'
import { Form, Input, SubmitButton } from '../components/FormElements'
import { Instructions } from '../components/Instructions'
import { IFormData } from '../components/FormElements/Form'

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

const Index = () => {
  const router = useRouter()

  const handleLogin = (data: IFormData[]) => {
    console.log(data)
    router.push('/todos/list')
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
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(user => (
              <User key={user} />
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
  console.log(data)
  
  return {}
}

export default Index
