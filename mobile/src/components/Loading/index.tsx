import React from 'react'
import { ActivityIndicator } from 'react-native'

import { useTheme } from 'styled-components/native'
import * as S from './styles'

type LoadingSize = number | 'small' | 'large'

interface LoadingProps {
  overlap?: boolean
  size?: LoadingSize
  color?: string
}

const Loading: React.FC<LoadingProps> = ({ size = 30, overlap, color }) => {
  const theme = useTheme()

  if (overlap) {
    return (
      <S.Container>
        <ActivityIndicator
          size={size}
          color={color ?? theme.colors.secondary}
        />
      </S.Container>
    )
  }

  return (
    <ActivityIndicator size={size} color={color ?? theme.colors.secondary} />
  )
}

export default Loading
