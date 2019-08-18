import React from 'react'
import styled from '@emotion/styled'

const User = () => {
  return (
    <Card>
      <Circle />
      <Text>
        Username
      </Text>
    </Card>
  )
}

const Card = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  padding: 16px;
  margin-bottom: 16px;
  background: #1A936F;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);

`

const Circle = styled.div`
  margin-right: 24px;
  background: #fcfcfc;
  height: 32px;
  width: 32px;
  border-radius: 32px;
`
const Text = styled.p`
  font-family: 'Poppins Light';
  font-size: 24px;
  font-weight: 300;
  color: #fcfcfc;
`
export default User