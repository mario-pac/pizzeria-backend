import React from 'react'
import { TouchableOpacity } from 'react-native'

import * as S from './styles'

export type Type =
  | 'feather'
  | 'fontAwesome'
  | 'entypo'
  | 'material'
  | 'ionicons'
  | 'antdesign'
  | 'material-community'
  | 'fontAwesome5'
  | 'octicons'
  | 'fontisto'

export interface IconProps {
  type: Type
  size: number
  name: string
  disabled?: boolean
  color?: string
  right?: boolean
  inputDate?: boolean
  noOpacity?: boolean

  onPress?: () => void
}

const Icon: React.FC<IconProps> = ({
  type,
  size,
  name,
  color,
  noOpacity = false,
  inputDate = false,
  disabled = false,
  right = true,
  onPress
}) => {
  const Source = S.createIcon(type, color)

  return (
    <S.Container alignRight={right} date={inputDate}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={noOpacity ? 1 : 0.2}
      >
        <Source name={name} size={size} />
      </TouchableOpacity>
    </S.Container>
  )
}

export default Icon
