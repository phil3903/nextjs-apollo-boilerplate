import React, { useState } from 'react'
import Router from 'next/router'
import cookie from 'cookie'
import styled from '@emotion/styled'
import { Circle, Text as Username } from './User'
import { parseISO, format } from 'date-fns'
import { FiUser, FiMoreHorizontal } from 'react-icons/fi'
import { Dropdown, DropdownOption } from '../Dropdown'

interface IUserStatsProps {
  name: string
  createdDate: string
}

const UserStats = ({name, createdDate}: IUserStatsProps) => {
  const [isVisible, setDropdownVisiblity] = useState(false) 

  const handleEditUser = () => {
    setDropdownVisiblity(false)
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
        <IconButton onClick={() => setDropdownVisiblity(!isVisible)}>
          <FiMoreHorizontal 
            size={28}
            color={'#fcfcfc'}
          />
        </IconButton>
        <Dropdown isVisible={isVisible}>
          <DropdownOption
            text={'Edit User'}
            onClick={ handleEditUser }
          />
          <DropdownOption 
            text={'Logout'} 
            onClick={ handleLogout }
          />
        </Dropdown>
      </Heading>
      <Row>
        <LeftText>User Since:</LeftText>
        <RightText>{format(parseISO(createdDate), 'MMM dd, yyyy')}</RightText>
      </Row>
      <Row>
        <LeftText>Remaining Todos:</LeftText>
        <RightText>X</RightText>
      </Row>
    </div>
  )
}

const IconButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
`

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

export default UserStats