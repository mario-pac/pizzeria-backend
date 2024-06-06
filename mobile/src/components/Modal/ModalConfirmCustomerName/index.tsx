import React, { useState } from "react";
import { Modal, View } from "react-native";

import Button from "components/Button";
import { useTheme } from "styled-components";
import Input from "components/Input";

interface Props {
  showModal: boolean;
  onClose?: (value: string) => void;
  closeModal?: () => void;
}

const ModalConfirmCustomerName: React.FC<Props> = ({ showModal, onClose }) => {
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
            opacity: 0.4,
            backgroundColor: "#242424",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.background,
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              label="Insira o nome do cliente:"
              value={value}
              onChangeText={setValue}
            />
            <Button
              value="Fechar"
              onPress={() => onClose && onClose(value)}
              color={theme.colors.status.error}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirmCustomerName;
