import React from 'react'
import styled from '@emotion/styled'

const UserList = (props:any) => {
  return (
    <List>
      <Title>
        Login
      </Title>
      <Scrollable>
        {props.children}
      </Scrollable>
    </List>
  )
}

const Title = styled.h1`
  font-family: 'Poppins Light';
  font-weight: 300;
  font-size: 36px;
  margin: 0 0 24px 0;
  color: #fcfcfc;

`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;`

export default UserList