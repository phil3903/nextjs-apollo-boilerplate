import React from 'react'
import styled from '@emotion/styled'

interface IUserProps {
  name?: string,
  photo?: string,
  isSelected?: boolean,
  onClick: Function
}

const User = ({name, isSelected, onClick}: IUserProps) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <Card 
      isSelected={isSelected}
      onClick={handleClick}
    >
      <Circle />
      <Text>
        {name}
      </Text>
    </Card>
  )
}

const Card = styled.button<{
  isSelected?: boolean
}>`
  display: flex;
  align-items: center;
  height: 72px;
  min-height: 72px;
  padding: 16px;
  margin-bottom: 16px;
  background: #1A936F;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid transparent;
  ${({ isSelected }) => isSelected ? 'border: 4px solid #F3E9D2' : 'none' };
`

export const Circle = styled.div`
  margin-right: 24px;
  background: #fcfcfc;
  height: 32px;
  width: 32px;
  border-radius: 32px;
`
export const Text = styled.p`
  font-family: 'Poppins Light';
  font-size: 24px;
  font-weight: 300;
  color: #fcfcfc;
`
export default User