import React from 'react'
import Router from 'next/router'
import cookie from 'cookie'
import { gql } from 'apollo-boost'
import styled from '@emotion/styled'
import { Circle, Text as Username } from './User'
import { parseISO, format } from 'date-fns'
import { FiUser } from 'react-icons/fi'
import { useMutation } from '@apollo/react-hooks';

export const REMOVE_USER = gql`
  mutation RemoveUser{
    removeUser {
      id
    }
  }
`

interface IUserStatsProps {
  name: string
  createdDate: string
  todoCount: number
}

const UserStats = ({name, createdDate, todoCount = 0}: IUserStatsProps) => {

  const [removeUser] = useMutation(REMOVE_USER)
  const handleDeleteAccount = async () => {
    try {
      await removeUser()
      Router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      document.cookie = await cookie.serialize('authorization', 'null', {
        maxAge: -1,
        path: '/'
      })
      Router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }
  return(
    <div>
      <Heading>
        <Wrapper>
          <Circle>
            <FiUser />
          </Circle>
          <Username>
            {name}
          </Username>
        </Wrapper>
        
      </Heading>
      <Row>
        <LeftText>User Since:</LeftText>
        <RightText>{format(parseISO(createdDate), 'MMM dd, yyyy')}</RightText>
      </Row>
      <Row>
        <LeftText>Total Todos:</LeftText>
        <RightText>{todoCount}</RightText>
      </Row>
      <Button onClick={ handleDeleteAccount }>
        Delete Account
      </Button>
      <Button onClick={ handleLogout }>
        Logout
      </Button>
    </div>
  )
}

const Heading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #FCFCFC;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const LeftText = styled.p`
  font-family: 'Poppins Thin';
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
  color: #fcfcfc;
`
const RightText = styled.p`
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  text-align: right;
  color: #fcfcfc;
`

const Button = styled.button`
  text-align: center;
  background: #1A936F;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  width: 100%;
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  color: #fcfcfc;
  border: none;
  height: 38px;
  border-radius: 2px;
  margin-top: 14px;
  &:hover{
    background: #28A37E;
  }
`

export default UserStats