import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getGameBoxart, getGamePortrait } from "../../utils/steamTools";
import { GameController } from "akar-icons";
import { useState } from "react";

export const BoxArt = ({ appid, ...props }) => {
  const [
    imageError,
    // setImageError
  ] = useState(false);
  const imageUrl = getGameBoxart(appid);

  if (imageUrl && !imageError) {
    return (
      <Image
        {...props}
        src={imageUrl}
        alt="boxart"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = getGamePortrait(appid);
          // setImageError(true);
        }}
      />
    );
  }
  return (
    <NullContainer {...props}>
      <GameController size={80} strokeWidth={1.5} style={{ opacity: 0.8 }} />
    </NullContainer>
  );
};

const Image = styled.img`
  ${getContainerStyle}
`;

const NullContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2979ff;
  color: white;
  ${getContainerStyle};
`;

function getContainerStyle() {
  return css`
    min-width: 250px;
    height: 375px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  `;
}
