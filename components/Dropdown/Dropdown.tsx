import styled from '@emotion/styled'

const Dropdown = styled.ul<{isVisible: boolean}>`
  visibility: ${({isVisible}) =>  isVisible ? 'visible' : 'hidden'};
  opacity: ${({isVisible}) =>  isVisible ? 1 : 0};
  position: absolute;
  right: 0;
  top: 26px;
  background: #114B5F;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  width: 200px;
  li:last-child {
    border: transparent;
  }

  transition: all 0.3s;

`

export default Dropdown