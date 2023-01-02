import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Alarm } from "akar-icons";
import { BiAward } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Col, Row, Progressbar } from "../../components/common";
import {
  useGameAchievements,
  useSteamId,
  useUserGameDetails,
} from "../../utils/hooks";
import { useToggleFavGames } from "../../utils/hooks/useFavGames";
import { getGameCapsuleMedium, getPlaytime } from "../../utils/steamTools";
import { FavToggle } from "../GameDetails/GameDetails.FavToggle";

export const WatchListItem = ({ appid }) => {
  const [steamId] = useSteamId();
  const [details] = useUserGameDetails(steamId, appid);
  const [achievements] = useGameAchievements(steamId, appid);
  const toggleGameFav = useToggleFavGames();
  const unlockedAchievements = achievements.filter((item) => item.achieved);

  return (
    <Col>
      <FavToggle
        css={styles.favToggle}
        toggled={true}
        onClick={(e) => {
          e.stopPropagation();
          toggleGameFav.mutate({ gameid: appid });
        }}
      />
      <Link
        style={{ textDecoration: "none", color: "unset" }}
        to={`/game/${appid}`}
      >
        <Container>
          <Col>
            <Overlay />
            <GameCaspule src={getGameCapsuleMedium(appid)} alt="image" />
          </Col>
          <Row style={{ padding: "1rem", paddingTop: ".8rem" }}>
            {details?.playtime_forever > 0 && (
              <Row style={{ alignItems: "center", gap: ".5rem" }}>
                <Alarm strokeWidth={2} size={16} />
                <Subheader>{getPlaytime(details.playtime_forever)}</Subheader>
              </Row>
            )}
            {achievements?.length > 0 && (
              <Row
                style={{
                  alignItems: "center",
                  gap: ".5rem",
                  marginLeft: "auto",
                }}
              >
                <BiAward size={16} />
                <Subheader>
                  {unlockedAchievements?.length} / {achievements?.length}
                </Subheader>
                <Progressbar
                  current={unlockedAchievements?.length}
                  total={achievements?.length}
                  style={{ width: 40, height: 7.5 }}
                />
              </Row>
            )}
          </Row>
        </Container>
      </Link>
    </Col>
  );
};

const styles = {
  favToggle: css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
  `,
};

const Container = styled(Col)`
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 150px rgba(0, 0, 0, 0.25) inset;
`;
const GameCaspule = styled.img`
  width: 400px;
`;
const Subheader = styled.p``;
