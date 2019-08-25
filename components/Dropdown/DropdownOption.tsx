import styled from '@emotion/styled'

const Option = styled.button`
  background: transparent;
  padding: 8px;
  width: 100%;
  color: #fcfcfc;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  border: 0;
  text-align: left;
  box-sizing: border-box;
  &:hover {
    background: #205060;
  }
`

const Li = styled.li`
 border-bottom: 1px solid #fcfcfc;
`

interface IDropdownOptions {
  text: string,
  onClick: () => void
}
const DropdownOption = ({text, onClick}: IDropdownOptions) => {
  return(
    <Li>
      <Option onClick={ onClick }>
        {text}
      </Option>
    </Li>
  )
}

export default DropdownOption