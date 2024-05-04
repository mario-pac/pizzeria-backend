import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const CText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(26)}px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: 6px;
  max-width: 92%;
`
