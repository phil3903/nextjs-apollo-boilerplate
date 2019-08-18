import React from 'react'
import styled from '@emotion/styled'

interface ITodoProps {
  isComplete: boolean,
  title: string,
  date: string,
  description: string
}

const Todo = ({isComplete, title, date, description}: ITodoProps) => {
  return (
    <Card isComplete={isComplete}>
      <Row>
        <Title>
          {title}
        </Title>
        <Date>
          {date}
        </Date>
      </Row>
      <Description>
        {description}
      </Description>
    </Card>
  )
}

const Card = styled.button<{ isComplete: boolean }>`
  display: flex;
  flex-wrap: wrap;
  color: #fcfcfc;
  padding: 16px;
  margin-bottom: 16px;
  background: #1A936F;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid transparent;
  &:focus {
    border: 4px solid #F3E9D2;
  }
  opacity: ${(props) => props.isComplete ? 0.5 : 1};
`

const Row = styled.div`
  display: flex;
  min-width: 100%;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`

const Title = styled.p`
  font-family: 'Poppins SemiBold';
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
`

const Date = styled.p`
  text-align: right;
  font-family: 'Poppins Light';
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
`

const Description = styled.p`
  font-family: Poppins Light;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
`
export default Todo