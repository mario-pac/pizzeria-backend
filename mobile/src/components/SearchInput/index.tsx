import React from "react";

import Input, { InputProps } from "../Input";

interface Props extends InputProps {
  onSearch?: () => void;
}

const SearchInput: React.FC<Props> = (props) => {
  return (
    <Input
      icon={{
        name: "search",
        size: 18,
        type: "feather",
        onPress: props.onSearch,
      }}
      {...props}
    />
  );
};

export default SearchInput;
