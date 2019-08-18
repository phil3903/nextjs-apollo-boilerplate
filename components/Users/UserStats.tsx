import React from 'react'
import styled from '@emotion/styled'
import {Circle, Text as Username} from './User'

const UserStats = () => {
  return(
    <div>
      <Heading>
        <Circle />
        <Username>Username</Username>
      </Heading>
      <Row>
        <LeftText>User Since:</LeftText>
        <RightText>Aug 12, 1987</RightText>
      </Row>
      <Row>
        <LeftText>Last Login:</LeftText>
        <RightText>Aug 12, 2019</RightText>
      </Row>
      <Row>
        <LeftText>Todos:</LeftText>
        <RightText>14</RightText>
      </Row>
    </div>
  )
}

const Heading = styled.div`
  display: flex;
  border-bottom: 1px solid #FCFCFC;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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