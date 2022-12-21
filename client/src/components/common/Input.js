import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { hexToRGBA } from "../../utils/tools";

export const Input = styled.input`
  padding: 0.25rem;
  min-width: unset;
  border-radius: 0.25rem;
  border: 1px solid ${`#b0bec5`};
  display: block;
  ${getErrorStyle}
`;

function getErrorStyle({ error }) {
  if (error) {
    return css`
      border-color: #d50000;
      :focus {
        outline-color: #d50000;
        box-shadow: 0 0 6px ${hexToRGBA("#d50000", 0.3)};
      }
    `;
  }
  return;
}
