import React, {MouseEvent} from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const NavBack = () => {
  const router = useRouter()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    router.back()
  }

  return (
    <Anchor onClick={handleClick}>
      X
    </Anchor>
  )
}

const Anchor = styled.a`
  cursor: pointer;
  color: #fcfcfc;
`

export default NavBack