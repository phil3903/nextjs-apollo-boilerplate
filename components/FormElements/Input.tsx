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
  
  return (
    <StyledInput 
      placeholder={placeholder}
      name={name}
      type={type}
      value={text}
      onChange={ handleOnChange }
    />
  )
}

Input.defaultProps = {
  formData: true,
  type: 'text'
}

export const StyledInput = styled.input`
  font-family: 'Poppins Light';
  font-size: 14px;
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

  ::-webkit-datetime-edit {  

  }
  ::-webkit-datetime-edit-fields-wrapper {

   }
  ::-webkit-datetime-edit-text,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-year-field { 
    color: ${props => props.value 
      ? 'rgba(252, 252, 252, 1)'
      : 'rgba(252, 252, 252, 0.5)'
    };
  }
  ::-webkit-inner-spin-button { 
    display: none; 
  }
  ::-webkit-calendar-picker-indicator { 
    padding-right: 16px;
    color: rgba(252, 252, 252, 0.7);
    :hover {
      color: rgba(252, 252, 252, 1);
      background: transparent;
      cursor: pointer;
    }
    
  }
`

export default Input