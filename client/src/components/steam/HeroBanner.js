import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getGameHeroBanner } from "../../utils/steamTools";

export const HeroBanner = ({ appid, ...props }) => {
  const imageUrl = getGameHeroBanner(appid);

  if (imageUrl) {
    return <Image {...props} src={imageUrl} alt="hero-banner" />;
  }
  return <NullContainer {...props}></NullContainer>;
};

const Image = styled.img`
  filter: brightness(0.3);
  width: 100%;
  ${getContainerStyle}
`;

const NullContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 32.292vw;
  background-color: #2979ff;
  filter: brightness(0.8);
  ${getContainerStyle};
`;

function getContainerStyle() {
  return css`
    box-shadow: 0 0 300px 300px rgba(0, 0, 0, 0.1) inset;
  `;
}
