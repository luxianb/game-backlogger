import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FavToggle } from "../../pages/GameDetails/GameDetails.FavToggle";
import { useToggleFavGames } from "../../utils/hooks/useFavGames";
import { getGameImageUrl, getPlaytime } from "../../utils/steamTools";
import { Col, Row } from "../common";

export const GameItem = ({
  appid,
  img_icon_url,
  name,
  playtime_forever,
  playtime_2weeks,
  favourited,
  style,
}) => {
  const toggleGameFav = useToggleFavGames();
  const getGamePlaytime = () => {
    if (!playtime_2weeks && !playtime_forever) return;
    let playtime = "";
    if (playtime_2weeks) playtime += getPlaytime(playtime_2weeks);
    if (playtime_2weeks && playtime_forever) playtime += " | ";
    if (playtime_forever) playtime += getPlaytime(playtime_forever);
    return <Subheader>{playtime}</Subheader>;
  };

  // const getPlaytimeForever = () => {
  //   if (!playtime_forever) return;
  //   let playtime = "Total playtime: ";
  //   playtime += getPlaytime(playtime_forever);
  //   return <Subheader>{playtime}</Subheader>;
  // };
  // const getPlaytime2Weeks = () => {
  //   if (!playtime_forever) return;
  //   let playtime = "Last 2 weeks: : ";
  //   playtime += getPlaytime(playtime_2weeks);
  //   return <Subheader>{playtime}</Subheader>;
  // };

  return (
    <Row>
      <Link to={`/game/${appid}`} style={{ textDecoration: "none" }}>
        <Container style={style}>
          <Image
            src={getGameImageUrl(appid, img_icon_url)}
            alt="game_thumbnail"
          />
          <Col>
            <Header>{name}</Header>
            {getGamePlaytime()}
          </Col>
        </Container>
      </Link>
      <FavToggle
        css={styles.favToggle}
        toggled={favourited}
        onClick={() => toggleGameFav.mutate({ appid })}
      />
    </Row>
  );
};

const styles = {
  favToggle: css`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1rem;
    z-index: 1;
  `,
};

const Container = styled(Row)`
  color: white;
  width: 360px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
  padding-right: 2rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Image = styled.img`
  height: 55px;
  width: 55px;
  margin-right: 0.5rem;
  border-radius: 4px;
`;
const Header = styled.p`
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
`;
const Subheader = styled.p`
  font-size: 0.7rem;
  opacity: 0.6;
`;
