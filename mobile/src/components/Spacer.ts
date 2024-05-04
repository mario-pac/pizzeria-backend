import styled from 'styled-components/native'

function getHeightString(height?: number | string) {
  if (typeof height === 'string') {
    return height
  } else if (typeof height === 'number') {
    return height + 'px'
  } else {
    return '10px'
  }
}

function getWidthString(height?: number | string) {
  if (typeof height === 'string') {
    return height
  } else if (typeof height === 'number') {
    return height + 'px'
  } else {
    return '100%'
  }
}

interface SpacerProps {
  height?: number | string
  width?: number | string
  hasColor?: boolean
  color?: string
}
const Spacer = styled.View<SpacerProps>`
  height: ${p => getHeightString(p.height)};
  width: ${p => getWidthString(p.width)};
  ${p => (p.hasColor ? 'background-color: ' + p.theme.colors.separator : null)}
  ${p => (p.color ? 'background-color: ' + p.color : null)}
`

export default Spacer
