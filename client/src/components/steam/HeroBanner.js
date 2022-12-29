import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getGameHeroBanner } from "../../utils/steamTools";

export const HeroBanner = ({ appid, fallback, ...props }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getGameHeroBanner(appid);

  useEffect(() => {
    if (fallback) {
      setImageError(false);
    }
  }, [fallback]);

  if (imageUrl && !imageError) {
    return (
      <Image
        {...props}
        src={imageUrl}
        alt="hero-banner"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          if (!fallback) {
            setImageError(true);
          } else {
            currentTarget.src = fallback;
          }
        }}
      />
    );
  }
  return <NullContainer {...props}></NullContainer>;
};

const Image = styled.img`
  filter: brightness(0.3);
  max-height: 32.292vw;
  width: 100%;
  ${getContainerStyle}
`;

const NullContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 32.292vw;
  max-height: 32.292vw;
  background-color: #2979ff;
  filter: brightness(0.8);
  ${getContainerStyle};
`;

function getContainerStyle() {
  return css`
    box-shadow: 0 0 300px 300px rgba(0, 0, 0, 0.1) inset;
  `;
}
