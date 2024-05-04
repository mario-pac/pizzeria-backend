import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ContainerProps {
  insetTop: number
}
export const Container = styled.View.attrs({
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
  flex-direction: row;
  align-items: center;
  padding: 0 20px 16px 20px;
  padding-top: ${p => p.insetTop + 16 + 'px'};
  background-color: ${p => p.theme.colors.header.backgroundColor};
`

export const Text = styled.Text`
  font-family: ${p => p.theme.fonts.semibold};
  font-size: ${RFValue(18)}px;
  color: ${p => p.theme.colors.text.secondary};
`
