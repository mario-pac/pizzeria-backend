import React from "react";
import { Modal, View } from "react-native";

import { Models } from "api/index";

import Input from "components/Input";
import Spacer from "components/Spacer";

import { useTheme } from "styled-components/native";
import Title from "../Title";

interface Props {
  showModal: boolean;
  filter: Models.ProductListFilters;
  setFilter: (filter: Models.ProductListFilters) => void;
  closeModal?: () => void;
}

const ModalFiltersProducts: React.FC<Props> = ({
  showModal,
  filter,
  setFilter,
  closeModal,
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
            <Title title="Filtros:" closeModal={closeModal} />
            <Spacer height={6} />
            <Input
              label="Nome"
              value={filter.description}
              onChangeText={(description) =>
                setFilter({ ...filter, description })
              }
            />
            <Spacer height={6} />
            <Input
              label="Categoria"
              value={filter.category}
              onChangeText={(category) => setFilter({ ...filter, category })}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalFiltersProducts;
