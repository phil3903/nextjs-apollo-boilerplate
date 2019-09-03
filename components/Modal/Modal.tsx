import styled from '@emotion/styled'

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: linear-gradient(57.99deg, #114b5f 0%, #1a936f 100%);
  color: #fcfcfc;
  margin-top: 20%;
  width: 90%;
  padding: 24px;
  border-radius: 2px;
`

const Overlay = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`

const Button = styled.button`
  text-align: center;
  background: #114b5f;
  width: 100%;
  font-family: 'Poppins Light';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #fcfcfc;
  border: none;
  height: 40px;
  border-radius: 2px;
  &:hover {
    background: #205060;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`

const Modal = () => {
  return (
    <Overlay>
      <Dialog>
        This is a modal
        <Wrapper>
          <Button>Cancel </Button>
          <Button>Confirm </Button>
        </Wrapper>
      </Dialog>
    </Overlay>
  )
}

export default Modal
