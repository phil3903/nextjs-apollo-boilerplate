import React, {useRef, useState} from 'react'
import Router from 'next/router'
import cookie from 'cookie'
import { gql } from 'apollo-boost'
import styled from '@emotion/styled'
import { Circle, Text as Username } from './User'
import { parseISO, format } from 'date-fns'
import { FiUser, FiLogOut} from 'react-icons/fi'
import { useMutation } from '@apollo/react-hooks'
import ReactTooltip from 'react-tooltip'
import { Tooltip } from '../Tooltip'

export const REMOVE_USER = gql`
  mutation RemoveUser{
    removeUser {
      id
    }
  }
`

interface IUserStatsProps {
  name: string
  createdDate: string
  todoCount: number
}

type TooltipRef = {tooltipRef: null} | null

const UserStats = ({name, createdDate, todoCount = 0}: IUserStatsProps) => {
  const tooltip = useRef(null)
  const [isOpen, setTooltipOpen] = useState(false)
  const [removeUser] = useMutation(REMOVE_USER)

  const handleCancelTooltip = () =>{
    const current : TooltipRef = tooltip.current
    current!.tooltipRef = null
    if(isOpen){
      setTooltipOpen(false)
      ReactTooltip.hide()
    }
  }
  const handleDeleteAccount = async () => {
    try {
      await removeUser()
      Router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      document.cookie = await cookie.serialize('authorization', 'null', {
        maxAge: -1,
        path: '/'
      })
      Router.replace('/')
    } catch (err) {
      console.log(err)
    }
  }
  return(
    <div>
      <Heading>
        <Wrapper>
          <User>
            <Circle>
              <FiUser />
            </Circle>
            <Username>
              {name}
            </Username>
          </User>
          <Logout onClick={ handleLogout }>
             Logout <FiLogOut style={{marginBottom: -2, marginLeft: 2}}/>
          </Logout>
        </Wrapper>
        
      </Heading>
      <Row>
        <LeftText>User Since:</LeftText>
        <RightText>{format(parseISO(createdDate), 'MMM dd, yyyy')}</RightText>
      </Row>
      <Row>
        <LeftText>Total Todos:</LeftText>
        <RightText>{todoCount}</RightText>
      </Row>
      <Button
        data-tip
        data-event="click"
      >
        Delete Account
      </Button>
      <ReactTooltip 
        ref={tooltip}
        clickable={true}
        globalEventOff='click'
        effect={'solid'}
        afterShow={()=> setTooltipOpen(true)}
        afterHide={()=> setTooltipOpen(false)}
        getContent={ () => (
          <Tooltip 
            onCancel={ handleCancelTooltip } 
            onConfirm={ handleDeleteAccount }
          />
        )} 
      />
    </div>
  )
}

const Heading = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #FCFCFC;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 16px;
`

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`

const User = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const LeftText = styled.p`
  font-family: 'Poppins Thin';
  font-style: normal;
  font-weight: 200;
  font-size: 14px;
  color: #fcfcfc;
`
const RightText = styled.p`
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  text-align: right;
  color: #fcfcfc;
  white-space: nowrap;
`

const Button = styled.button`
  text-align: center;
  background: #1A936F;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  width: 100%;
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  color: #fcfcfc;
  border: none;
  height: 38px;
  border-radius: 2px;
  margin-top: 14px;
  transition: all 0.3s;
  &:hover{
    background: #28A37E;
  }
`

const Logout = styled.button`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #fcfcfc;
  opacity: 0.5;
  border: none;
  background: transparent;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`

export default UserStats