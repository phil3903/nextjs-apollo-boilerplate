import styled from '@emotion/styled'

interface ITooltipProps {
  onConfirm: () => void
  onCancel: () => void
}
const Tooltip = ({ onConfirm, onCancel }: ITooltipProps) => {
  return (
    <Container>
      <Title>Delete Account</Title>
      <Message>
        Are you sure you want to delete your account? This cannot be undone, but
        feel free to make another!
      </Message>
      <Wrapper>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Wrapper = styled.div`
  display: flex;
`
const Title = styled.p`
  font-family: 'Poppins Medium';
  font-size: 14px;
  text-align: left;
  margin: 16px 8px 8px 8px;
`
const Message = styled.p`
  font-family: 'Poppins Light';
  font-weight: 200;
  font-size: 12px;
  text-align: left;
  width: 250px;
  margin: 8px;
  line-height: 1.5;
`
const CancelButton = styled.button`
  flex: 1;
  margin: 8px 8px 16px 8px;
  background: transparent;
  border: 1px solid #fcfcfc;
  color: #fcfcfc;
  border-radius: 2px;
  height: 30px;
  opacity: 0.7;
  transition: all 0.3s;
  &:hover {
    color: #ffffff;
    border-color: #ffffff;
    opacity: 1;
  }
`

const ConfirmButton = styled.button`
  flex: 1;
  margin: 8px 8px 16px 8px;
  margin: 8px;
  background: #c02300;
  color: #fcfcfc;
  border: none;
  border-radius: 2px;
  height: 30px;
  transition: all 0.3s;
  &:hover {
    background: #c92400;
  }
`

export default Tooltip
