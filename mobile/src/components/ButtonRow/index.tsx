import React from 'react'

import * as S from './styles'

interface Props {
  onConfirm?: () => void
  onCancel?: () => void
  disableConfirm?: boolean
}

const ButtonRow: React.FC<Props> = ({
  onCancel,
  onConfirm,
  disableConfirm = false
}) => {
  return (
    <S.Row>
      <S.OptBtn style={S.styles.shadow} onPress={onCancel} isConfirm={false}>
        <S.OptBtnText>Cancelar</S.OptBtnText>
      </S.OptBtn>

      <S.OptBtn
        style={S.styles.shadow}
        onPress={onConfirm}
        isConfirm
        disabled={disableConfirm}
      >
        <S.OptBtnText>Gravar</S.OptBtnText>
      </S.OptBtn>
    </S.Row>
  )
}

export default ButtonRow
