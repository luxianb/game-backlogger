import styled from "@emotion/styled";

import { navigateToSteamAuth } from "../../utils/steamTools";
import SteamButtonSmall from "../../assets/steam_button_1.png";
import SteamButtonLarge from "../../assets/steam_button_2.png";

export const SteamButton = ({ onClick, size, ...props }) => {
  const getButton = () => {
    switch (size) {
      case "big":
        return SteamButtonLarge;
      case "small":
      default:
        return SteamButtonSmall;
    }
  };

  return (
    <Img
      src={getButton()}
      alt="steam-button"
      onClick={onClick || navigateToSteamAuth}
      {...props}
    />
  );
};

const Img = styled.img`
  cursor: pointer;
`;
