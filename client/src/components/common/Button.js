import { css } from "@emotion/react";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: #304ffe;
  color: white;
  border: 0;
  ${getSizeStyle}
`;

export const Button = ({ label, children, ...props }) => {
  return <StyledButton {...props}>{label || children}</StyledButton>;
};

function getSizeStyle({ size }) {
  switch (size) {
    case "medium":
      return css`
        padding: 0.8rem 1.6rem;
      `;
    case "large":
      return css`
        padding: 1rem 2rem;
      `;
    case "small":
    default:
      return css`
        padding: 0.5rem 1rem;
      `;
  }
}
