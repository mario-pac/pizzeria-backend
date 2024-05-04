import { TouchableOpacityProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View<{ alignItems?: string }>`
  width: 100%;
  margin-top: 8px;
  flex-direction: row;
  justify-content: ${p => (!!p.alignItems ? p.alignItems : 'center')};
  align-items: center;
`

export const CheckText = styled.Text<{ size?: number }>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ size }) => (!!size ? RFValue(size) : RFValue(13))}px;
  line-height: ${({ size }) => (!!size ? RFValue(size + 4) : RFValue(18))}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 6px;
`

interface CheckProps extends TouchableOpacityProps {
  isActive?: boolean
}

export const Check = styled.TouchableOpacity<CheckProps>`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
`
