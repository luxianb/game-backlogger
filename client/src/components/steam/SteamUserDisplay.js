import styled from "@emotion/styled";
import { hexToRGBA } from "../../utils/tools";
import { Col, Row } from "../common";

export const SteamUserDisplay = ({ photo, id, displayName }) => {
  return (
    <Container>
      {photo && <ImageDisplay src={photo} alt="steam-display-pic" />}
      <Col gap=".25rem">
        <Title>{displayName}</Title>
        <Subheader>{`#${id}`}</Subheader>
      </Col>
    </Container>
  );
};

const Container = styled(Row)`
  background-color: ${hexToRGBA("#263238", 0.1)};
  min-width: 100px;
  padding: 0.2rem;
  border-radius: 0.5rem;
`;

const ImageDisplay = styled.img`
  height: 60px;
  border-radius: 0.4rem;
  margin-right: 0.5rem;
`;

const Title = styled.h3`
  font-size: 0.8rem;
`;

const Subheader = styled.p`
  font-size: 0.6rem;
  opacity: 0.8;
`;
