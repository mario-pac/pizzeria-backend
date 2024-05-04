import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
`

export const Text = styled.Text`
  font-family: ${p => p.theme.fonts.semibold};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(18)}px;
  color: ${p => p.theme.colors.text.primary};
  padding-right: 6px;
`
