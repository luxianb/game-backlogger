import { Col } from "../common";
import { getGameHeader } from "../../utils/steamTools";
import { AchievementItem } from "../steam/AchievementItem";
import styled from "@emotion/styled";

export const AchievementDisplayList = ({ appid, achievements = [] }) => {
  return (
    <Container>
      <img
        src={getGameHeader(appid)}
        alt="banner"
        style={{ marginBottom: "1rem" }}
      />

      {achievements.map((achievement) => (
        <AchievementItem
          key={achievement.achievementid}
          appid={achievement.gameid}
          apiname={achievement.achievementid}
          favourited={true}
          {...achievement}
        />
      ))}
    </Container>
  );
};

const Container = styled(Col)`
  border: 1px solid grey;
  min-width: 500px;
`;
