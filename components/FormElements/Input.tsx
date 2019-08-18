import React, {useState} from 'react'
import styled from '@emotion/styled'

interface InputProps {
  placeholder: string,
  type?: string
  name: string,
  formData: boolean
}

const Input = ({placeholder, name, type}: InputProps) => {
  const [text, setText] = useState('')
  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }
  
  return (
    <StyledInput 
      placeholder={placeholder}
      name={name}
      type={type}
      value={text}
      onChange={ handleOnChange }
      onBlur={ handleBlur }
    />
  )
}

Input.defaultProps = {
  formData: true,
  type: 'text'
}



const StyledInput = styled.input`
  height: 40px;
  min-height: 40px;
  margin-bottom: 16px;
  color: #fcfcfc;
  border: 2px solid #fcfcfc;
  border-radius: 2px;
  background: transparent;
  width: 100%;
  padding-left: 8px;
  ::placeholder {
    color: rgba(252, 252, 252, 0.5);
  }
`

export default Input