import React from 'react'
import styled from '@emotion/styled'
import { FiUser } from 'react-icons/fi'

interface IUserProps {
  name?: string
  photo?: string
  isSelected?: boolean
  onClick: Function
}

const User = ({ name, isSelected, onClick }: IUserProps) => {
  const handleClick = () => {
    onClick()
  }
  return (
    <Card isSelected={isSelected} onClick={handleClick}>
      <Circle>
        <FiUser />
      </Circle>
      <Text>{name}</Text>
    </Card>
  )
}

const Card = styled.button<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  height: 72px;
  min-height: 72px;
  padding: 16px;
  margin-bottom: 16px;
  background: #1a936f;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid transparent;
  ${({ isSelected }) => (isSelected ? 'border: 4px solid #F3E9D2' : 'none')};
  &:hover {
    background: #28a37e;
  }
`

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  background: #fcfcfc;
  height: 32px;
  width: 32px;
  min-height: 32px;
  min-width: 32px;
  color: #212121;
  border-radius: 32px;
`
export const Text = styled.p`
  font-family: 'Poppins Light';
  font-size: 24px;
  font-weight: 300;
  color: #fcfcfc;
`
export default User
