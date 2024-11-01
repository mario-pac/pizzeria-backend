import React, { useState } from "react";
import { Modal, View } from "react-native";

import Button from "components/Button";
import { useTheme } from "styled-components/native";
import Input from "components/Input";

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
            <Input
              label="Insira o nome do cliente:"
              value={value}
              onChangeText={setValue}
            />
            <Button
              value="Confirmar"
              onPress={() => {
                console.warn(onClose);
                onClose && onClose(value);
                closeModal();
              }}
            />
            <Button outline value="Cancelar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirmCustomerName;
