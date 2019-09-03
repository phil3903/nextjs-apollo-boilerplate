import React from 'react'
import styled from '@emotion/styled'

const SubmitButton = (props: any) => {
  return (
    <Button type={'submit'} value={props.text}>
      {props.text}
    </Button>
  )
}

const Button = styled.button`
  text-align: center;
  background: #114b5f;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  width: 100%;
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #fcfcfc;
  border: none;
  height: 40px;
  border-radius: 2px;
  &:hover {
    background: #205060;
  }
`

export default SubmitButton
