
import React from 'react'
import Navbar from '../components/Navbar'
import styled from '@emotion/styled'
import { UserList, User } from '../components/Users'

const Todos = () => {
  return(
    <div id="todos-page" className="container-fluid fill">
      <Navbar 
        title={'Todos'}
        stack={['Next.js', 'Apollo']}
      />
      <div className="row">
        <div className="col-lg-3" />
        <Col className="col-sm-3">
          <UserList>
            <User />
            <User />
            <User />
            <User />
            <User />
          </UserList>
        </Col>
        <Col className="col-sm-3">
        
        </Col>
        <div className="col-lg-3" />
      </div>
    </div>
  )
}

const Col = styled.div``

export default Todos