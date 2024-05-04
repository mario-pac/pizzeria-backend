import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker'

export const Container = styled.View<{ width?: number }>`
  width: ${p => p.width ?? 40}%;
`

export const Picker = styled(DateTimePicker)`
  width: 100%;
  color: ${({ theme }) => theme.colors.secondary};
`
