import React from 'react'
import styled from '@emotion/styled'
import { FiCalendar, FiAlertCircle, FiCheckSquare } from 'react-icons/fi'
import { parseISO, format, getUnixTime } from 'date-fns';


//const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
const FORMAT = 'MMM dd, yyyy'


interface ITodoProps {
  id: string,
  onClick: (id: string, onClick: boolean) => void,
  isComplete: boolean,
  title: string,
  description: string, 
  dueDate: string,
}

const Todo = ({id, onClick, isComplete, title, description, dueDate}: ITodoProps) => {
  const today = getUnixTime(new Date())
  const date = parseISO(dueDate)
  return (
    <Card 
      onClick={()=> onClick(id, !isComplete)}
      isComplete={isComplete}
    >
      <Row>
        <Title title={title}>
          {title}
        </Title>
          
          <Wrapper>
            <DateString>
              {isComplete ? 'Complete' : format(date, FORMAT)}
            </DateString>
            { isComplete 
              ? <FiCheckSquare color={'#fcfcfc'} title={'Due Date'} style={{marginLeft: 8}} /> 
              : today > getUnixTime(date)  
                ? <FiAlertCircle color={'#a94442'} title={'Overdue'} style={{marginLeft: 8}}/>
                : <FiCalendar color={'#fcfcfc'} title={'Due Date'} style={{marginLeft: 8}}/>
            }
        </Wrapper>
      </Row>
      <Description>
        {description}
      </Description>
    </Card>
  )
}

const Card = styled.button<{ isComplete: boolean }>`
  display: flex;
  flex-wrap: wrap;
  color: #fcfcfc;
  padding: 16px;
  margin-bottom: 16px;
  background: #1A936F;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border: 4px solid transparent;
  opacity: ${(props) => props.isComplete ? 0.5 : 1};
  &:hover{
    background: #28A37E;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  min-width: 100%;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`

const Title = styled.p`
  font-family: 'Poppins SemiBold';
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const DateString = styled.p`
  text-align: right;
  font-family: 'Poppins Light';
  font-weight: 500;
  font-size: 12px;
  line-height: 1;
  margin: 3px 0 0 8px;
  white-space: nowrap;
`

const Description = styled.p`
  font-family: Poppins Light;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  text-align: left;
`
export default Todo