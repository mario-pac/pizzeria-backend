import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ErrorPageProps {
  message: string
}

const Container = styled.View`
  background-color: ${p => p.theme.colors.background};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  color: ${p => p.theme.colors.input.color};
  padding: 0 24px;
  text-align: center;
`

const H = styled(Text)`
  font-size: ${RFValue(20)}px;
`

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <Container>
      <H>Erro!</H>
      <Text>{message}</Text>
    </Container>
  )
}

export default ErrorPage
