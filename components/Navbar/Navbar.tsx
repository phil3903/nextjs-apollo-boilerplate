import React from 'react'
//import { useRouter } from 'next/router'
import styled from '@emotion/styled'

/* Navbar */

interface INavbarProps {
  title: string
  stack: string[]
}

export const Navbar = (props: INavbarProps) => {
  return (
    <Bar className="row">
      <Title>{props.title}</Title>
      <StackText>{props.stack.join('  |  ')}</StackText>
    </Bar>
  )
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  max-height: 64px;
  margin-bottom: 24px;
`

const Title = styled.span`
  font-family: Poppins SemiBold;
  color: #f3e9d2;
  font-size: 24px;
  font-weight: 600;
  margin: 0 8px 0 8px;
`

const StackText = styled.span`
  font-family: Poppins Medium;
  color: #f3e9d2;
  font-size: 16px;
  font-weight: 500;
`

/* Clsoe  */

// const CloseButton = () => {
//   const router = useRouter()

//   const handleClick = (e: MouseEvent) => {
//     e.preventDefault()
//     router.back()
//   }

//   return (
//     <Anchor onClick={handleClick}>
//       X
//     </Anchor>
//   )
// }

// const Anchor = styled.a`
//   cursor: pointer;
//   color: #fcfcfc;
// `
