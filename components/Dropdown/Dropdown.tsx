
import styled from '@emotion/styled'

const Dropdown = styled.ul<{isVisible: boolean}>`
  visibility: ${({isVisible}) =>  isVisible ? 'visible' : 'hidden'};
  opacity: ${({isVisible}) =>  isVisible ? 1 : 0};
  position: absolute;
  right: 12px;
  top: 30px;
  background: #114B5F;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  width: 200px;
  transition: all 0.3s;
  li:last-child {
    border: transparent;
  }
`

export default Dropdown