import React from 'react'
import styled from '@emotion/styled'

const TodoList = (props:any) => {
  return (
    <List>
      <Title>
        Todos
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
  height: 36px;
  margin: 0 0 24px 0;
  color: #fcfcfc;

`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const Scrollable = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: visible;
  max-height: 700px;

`

export default TodoList