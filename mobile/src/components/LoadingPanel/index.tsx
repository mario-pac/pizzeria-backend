import React from 'react'
import { ActivityIndicator } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'
import { Container } from './style'

interface LoadingPanelProps {
  loading: boolean
}

const LoadingPanel: React.FC<LoadingPanelProps> = ({ loading }) => {
  const theme = useTheme()

  if (!loading) {
    return null
  }
  return (
    <Container>
      <ActivityIndicator size={RFValue(40)} color={theme.colors.secondary} />
    </Container>
  )
}

export default LoadingPanel
