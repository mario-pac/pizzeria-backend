import styled from 'styled-components/native'
import {
  Feather,
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  Fontisto
} from '@expo/vector-icons'

import { Type } from '.'

interface Props {
  alignRight?: boolean
  date?: boolean
}

export const Container = styled.View<Props>`
  align-items: center;

  justify-content: center;
  position: ${({ alignRight }) => (alignRight ? 'absolute' : 'relative')};
  ${({ date }) => (date ? 'right:-10px;' : 'undefined;')};
  ${({ alignRight, date }) =>
    alignRight && !date ? 'right:10px;' : 'undefined;'};
`

export const createIcon = (type: Type, color?: string) => {
  let source = null

  switch (type) {
    case 'fontAwesome':
      source = FontAwesome
      break
    case 'material':
      source = MaterialIcons
      break
    case 'entypo':
      source = Entypo
      break
    case 'ionicons':
      source = Ionicons
      break
    case 'material-community':
      source = MaterialCommunityIcons
      break
    case 'antdesign':
      source = AntDesign
      break
    case 'fontAwesome5':
      source = FontAwesome5
      break
    case 'octicons':
      source = Octicons
      break
    case 'fontisto':
      source = Fontisto
      break
    case 'feather':
    default:
      source = Feather
  }

  return styled(source)`
    color: ${({ theme }) => color ?? theme.colors.input.color};
  `
}
