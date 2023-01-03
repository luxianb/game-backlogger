import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import { Col, Progressbar, Row } from "../common";
import { getGameHeader } from "../../utils/steamTools";
import { AchievementItem } from "../steam/AchievementItem";
import { hexToRGBA } from "../../utils/tools";
import { useGameAchievements } from "../../utils/hooks";
import { FavToggle } from "../../pages/GameDetails/GameDetails.FavToggle";
import { useFavGames, useToggleFavGames } from "../../utils/hooks/useFavGames";
import React from "react";

export const AchievementDisplayList = ({ appid, achievements = [] }) => {
  const [source] = useGameAchievements(appid);
  const [favourited] = useFavGames(appid);
  const toggleGameFav = useToggleFavGames(appid);

  const renderHeroImage = () => {
    return (
      <Row>
        <FavToggle
          toggled={favourited}
          onClick={() => toggleGameFav.mutate({ appid })}
          css={favToggleStyles}
        />
        <Link to={`/game/${appid}`}>
          <img
            src={getGameHeader(appid)}
            alt="banner"
            style={{ width: "100%" }}
          />
        </Link>
      </Row>
    );
  };

  const renderHeader = () => {
    const length = achievements?.length;
    const total = source?.length;
    const unlocked = source?.filter((item) => item.achieved)?.length;
    const percentage = Math.floor((unlocked / total) * 100);

    return (
      <HeaderContainer>
        <Header>
          Tracking {length} / {total}
        </Header>
        <ProgressContainer>
          <Progressbar current={unlocked} total={total} style={{ width: 40 }} />
          {percentage}%
        </ProgressContainer>
      </HeaderContainer>
    );
  };

  const renderAchievementList = () => {
    if (!achievements.length) return;

    const renderList = () =>
      achievements.map((achievement, index, arr) => (
        <React.Fragment key={achievement.apiname}>
          <AchievementItem
            appid={achievement.appid}
            apiname={achievement.apiname}
            favourited={true}
            css={itemStyles}
            {...achievement}
          />
          {index !== arr.length - 1 && <Separator />}
        </React.Fragment>
      ));

    return <ListContainer>{renderList()}</ListContainer>;
  };

  return (
    <Container>
      {renderHeroImage()}
      {renderHeader()}
      {renderAchievementList()}
    </Container>
  );
};

const Container = styled(Col)`
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  /* border: 1px solid grey; */
  width: 400px;
`;
const HeaderContainer = styled(Row)`
  margin: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
`;
const Header = styled.h4``;
const ProgressContainer = styled(Row)`
  gap: 0.333rem;
  align-items: center;
  margin-left: auto;
  font-size: 0.75rem;
`;
const ListContainer = styled(Col)`
  margin: 1rem;
  margin-top: 0;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0;
  gap: 0.5rem;
  border-radius: 8px;
`;
const Separator = styled.div`
  height: 1px;
  width: auto;
  margin: 0 0.5rem;
  background-color: ${hexToRGBA("#000000", 0.3)};
  box-shadow: 0 0 4px ${hexToRGBA("#000000", 0.2)};
`;
const itemStyles = css`
  min-width: unset;
  background-color: unset;
  padding: 0 0.5rem;
  padding-bottom: 0;

  .achievement-container {
  }
  .achievement-header {
    font-size: 1rem;
  }
  .achievement-subheader {
    font-size: 0.8rem;
  }
  .achievement-unlock {
  }
  .achievement-icon {
    height: 80px;
    width: 80px;
  }
  .achievement-fav-toggle {
    font-size: 0.8rem;
  }
`;
const favToggleStyles = css`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  font-size: 1rem;
  z-index: 1;
`;
