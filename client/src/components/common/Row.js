import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  position: relative;
  ${getGapStyle}
`;

function getGapStyle({ gap }) {
  if (gap && typeof gap === "string")
    return css`
      gap: ${gap};
    `;
  if (gap)
    return css`
      gap: ${gap + "px"};
    `;
}
