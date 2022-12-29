import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { getGameImageUrl, getPlaytime } from "../../utils/steamTools";
import { Col, Row } from "../common";

export const GameItem = ({
  appid,
  img_icon_url,
  name,
  playtime_forever,
  playtime_2weeks,
}) => {
  return (
    <Link to={`/game/${appid}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image
          src={getGameImageUrl(appid, img_icon_url)}
          alt="game_thumbnail"
        />
        <Col>
          <Header>{name}</Header>
          {playtime_forever > 0 && (
            <Subheader>
              Total playtime: {getPlaytime(playtime_forever)}
            </Subheader>
          )}
          {playtime_2weeks > 0 && (
            <Subheader>Last 2 weeks: {getPlaytime(playtime_2weeks)}</Subheader>
          )}
        </Col>
      </Container>
    </Link>
  );
};

const Container = styled(Row)`
  color: white;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const Image = styled.img`
  height: 60px;
  width: 60px;
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
