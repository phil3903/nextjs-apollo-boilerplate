
import React from 'react'
import Navbar from '../components/Navbar'
//import styled from '@emotion/styled'
import { UserList, User } from '../components/Users'
import { Form, Input, SubmitButton } from '../components/FormElements'
import { Instructions } from '../components/Instructions'
import { IFormData } from 'components/FormElements/Form';

const Todos = () => {

  const handleLogin = (data: IFormData[]) => {
   console.log(data)
  }

  return(
    <div id="todos-page" className="container-fluid fill">
      <Navbar 
        title={'Todos'}
        stack={['Next.js', 'Apollo']}
      />
      <div className="row">
        <div className="col-sm-2">
          <Instructions />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <UserList>
            {[0,1,2,3,4,5,6,7,8,9,10].map((user) =>
              <User 
                key={user}
              />
            )}
          </UserList>
        </div>
        <div className="col-sm-3">
          <Form title={'Login'} onSubmit={handleLogin}>
            <Input name="name" placeholder={'Name'}/>
            <Input name="password" placeholder={'Password'} type="password"/>
            <SubmitButton text={'Login'}/>
          </Form>
        </div>
        <div className="col-lg-3" />
      </div>
    </div>
  )
}




export default Todos