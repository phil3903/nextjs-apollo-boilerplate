import React from 'react'
import styled from '@emotion/styled'

const Instructions = () => {
  return(
    <Container>
      <Title>Instructions:</Title>
      <Ul>
        <Li>
          Make up any fake Name and Password to create a user. I’m using bcrypt and redacting passwords in
          the backend, but don’t use your real password please! I'm exposing the list of Users to any unauthenticated visitor.
        </Li>
        <Li>
          Whoever you logged in as last is stored in a JWT for 1 hour, so if you
          refresh the page, you shoud be automatically logged back in.
        </Li>
      </Ul>
    </Container>
  )
}

const Container = styled.div`
  color: #fcfcfc;
`

const Title = styled.h3`
  font-family: 'Poppins SemiBold';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`

const Ul = styled.ul`
  
`

const Li = styled.li`
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  margin-top: 16px;
`

export default Instructions
