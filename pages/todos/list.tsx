
import React from 'react'
import { format } from 'date-fns'
import { UserStats } from '../../components/Users'
import { Todo, TodoList } from '../../components/Todos'
import { Form, Input, SubmitButton } from '../../components/FormElements'
import { IFormData } from '../../components/FormElements/Form'

const Todos = () => {

  const date = format(new Date(), 'MMM do, YYYY') 

  const handleCreate = (data: IFormData[]) => {
    console.log(data)
  }

  return(
    <>
      <div className="row">
        <div className="col-sm-2">
          <UserStats />
        </div>
        <div className="col-sm-1" />
        <div className="col-sm-3">
          <TodoList title="Todos">
            {[0,1,2,3,4,5,6,7,8,9,10].map((todo) =>
              <Todo 
                key={todo}
                isComplete={false}
                title="My Todo"
                date={ date }
                description="This is the long form description"
              />
            )}
          </TodoList>
        </div>
        <div className="col-sm-3">
          <Form title={'Create'} onSubmit={handleCreate}>
            <Input name="title" placeholder={'Title'}/>
            <Input name="description" placeholder={'Description'} />
            <Input name="date" placeholder={'Due Date'} type="date" />
            <SubmitButton text={'Create Todo'}/>
          </Form>
        </div>
        <div className="col-lg-3" />
      </div>
    </>
  )
}




export default Todos