import React from 'react'
import styled from '@emotion/styled'
// const Filter = require('bad-words')
// const filter = new Filter()

export interface IFormData {
  name: string
  value: string | number | boolean | null | undefined
}

interface IFormProps {
  children: any
  title: string
  onSubmit: (data: IFormData[]) => void
}

const Form = ({ title, children, onSubmit }: IFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = children
      .filter((c: any) => c.props.formData)
      .reduce((obj: object, c: any) => {
        const data = new FormData(e.target as HTMLFormElement)
        return {...obj, [c.props.name]:data.get(c.props.name)}
      }, {})

    onSubmit(data)
  }

  return (
    <Container>
      <Title>{title}</Title>
      <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
    </Container>
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

const Container = styled.div``

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export default Form
