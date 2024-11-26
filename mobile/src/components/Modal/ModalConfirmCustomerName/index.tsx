import React, { useState } from "react";
import { Modal, View } from "react-native";

import Button from "components/Button";
import { useTheme } from "styled-components/native";
import Input from "components/Input";
import { log } from "../../../log";
import Title from "../Title";

interface Props {
  showModal: boolean;
  onClose?: (value: string) => void;
  closeModal: () => void;
}

const ModalConfirmCustomerName: React.FC<Props> = ({
  showModal,
  onClose,
  closeModal,
}) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  return (
    <View>
      <Modal transparent={true} visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 1,
            backgroundColor: "#0000008f",
            padding: 16,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              gap: 10,
            }}
          >
            <Title title="Informe o nome do cliente:" closeModal={closeModal} />
            <Input value={value} onChangeText={setValue} />
            <Button
              value="Confirmar"
              onPress={() => {
                onClose && onClose(value);
                closeModal();
              }}
              width="100%"
            />
            <Button
              outline
              value="Cancelar"
              onPress={closeModal}
              width="100%"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirmCustomerName;
