import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Col } from "../common";
import { AchievementItem } from "./AchievementItem";

export const AchievementList = ({
  achievements,
  favAchievements,
  appid,
  direction,
  filter,
  style,
}) => {
  const getFilter = (item) => {
    switch (filter) {
      case "completed":
        return item.achieved;
      case "incompleted":
        return !item.achieved;
      default:
        return true;
    }
  };

  const getSorting = (a, b) => {
    switch (filter) {
      case "completed":
        return b.unlocktime - a.unlocktime;
      default:
        return 0;
    }
  };

  const renderList = () => {
    return achievements
      .filter(getFilter)
      .sort(getSorting)
      .map((item) => {
        const favourited = favAchievements.some(
          (e) => e.achievementid === item.apiname
        );
        const prop = { ...item, appid, favourited };
        return <AchievementItem key={item.apiname} {...prop} />;
      });
  };

  return (
    <Container style={style} direction={direction}>
      {renderList()}
    </Container>
  );
};

const Container = styled(Col)`
  ${getDirectionStyle}
`;

function getDirectionStyle({ direction }) {
  switch (direction) {
    case "horizontal":
      return css`
        flex-direction: row;
      `;
    case "vertical":
    default:
      return css`
        flex-direction: row;
      `;
  }
}
