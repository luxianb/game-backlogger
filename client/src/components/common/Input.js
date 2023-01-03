import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { hexToRGBA } from "../../utils/tools";

export const Input = styled.input`
  padding: 0.5rem;
  min-width: unset;
  border-radius: 0.25rem;
  border: none;
  /* border: 1px solid ${hexToRGBA(`#263238`, 0)}; */
  background-color: ${hexToRGBA(`#263238`, 1)};
  display: block;
  color: ${hexToRGBA(`#ffffff`, 0.7)};
  font-size: 0.9rem;
  :focus-visible {
    outline: 1px solid #1e88e5;
  }
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
