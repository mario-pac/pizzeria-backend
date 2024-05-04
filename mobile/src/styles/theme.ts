import { DefaultTheme } from "styled-components/native";

export type AppTheme = {
  fonts: {
    regular: string;
    medium: string;
    mediumItalic: string;
    semibold: string;
    bold: string;
  };
  colors: {
    primary: string;
    secondary: string;
    card: string;
    button: {
      primary: string;
    };
    status: {
      active: string;
      error: string;
      warning: string;
    };
    disabled: string;
    header: {
      backgroundColor: string;
    };
    input: {
      backgroundColor: string;
      color: string;
      placeholder: string;
      disabled: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    background: string;
    separator: string;
  };
};

export const theme: AppTheme = {
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    mediumItalic: "Poppins_500Medium_Italic",
    semibold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
  },
  colors: {
    primary: "#DD0300",
    secondary: "#228B22",
    disabled: "#C0C0C0",
    card: "#FFD700",
    header: {
      backgroundColor: "#AA0D00",
    },
    button: {
      primary: " #FFA500",
    },
    status: {
      active: "#22CC55",
      error: "#FF3322",
      warning: "#FF8811",
    },
    text: {
      primary: "#002510",
      secondary: "#FFFFFF",
    },
    input: {
      backgroundColor: "#fff",
      color: "#454545",
      placeholder: "#6C6C6C",
      disabled: "#E0E0E4",
    },
    background: "#CACACA",
    separator: "silver",
  },
};
