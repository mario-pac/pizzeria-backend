import styled from "styled-components/native";

interface ShadowProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}
export const Shadows = styled.View.attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: -2,
    height: 4,
  },
  shadowOpacity: 0.36,
  shadowRadius: 1.0,
  elevation: 6,
})<ShadowProps>`
  width: ${(p) => (p.width ? p.width + "px" : "100%")};
  height: ${(p) => (p.height ? p.height + "px" : "100%")};
  border-radius: ${(p) => (p.borderRadius ? p.borderRadius : "16px")};
  overflow: hidden;
`;
