import styled from 'styled-components/native'

interface ContainerProps {
  insetTop: number
  flexStart?: boolean
}
const HeaderContainer = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: -2,
    height: 4
  },
  shadowOpacity: 0.36,
  shadowRadius: 1.0,

  elevation: 6
})<ContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ flexStart }) =>
    flexStart ? 'flex-start' : 'space-between'};
  padding: 10px;
  padding-top: ${p => p.insetTop + 12}px;
  background-color: ${({ theme }) => theme.colors.header.backgroundColor};
`

export default HeaderContainer
