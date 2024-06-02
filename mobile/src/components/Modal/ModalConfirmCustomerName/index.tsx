import React from "react";
import { Modal, View, Text, TextInput } from "react-native";

import Button from "components/Button";
import { useTheme } from "styled-components";
import Input from "components/Input";

interface Props {
  showModal: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onClose?: () => void;
  closeModal?: () => void;
}

const ModalConfirmCustomerName: React.FC<Props> = ({
  showModal,
  onChangeText,
  onClose,
  value,
}) => {
  const theme = useTheme();
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
              onChangeText={onChangeText}
            />
            <Button
              value="Fechar"
              onPress={onClose}
              color={theme.colors.status.error}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalConfirmCustomerName;
