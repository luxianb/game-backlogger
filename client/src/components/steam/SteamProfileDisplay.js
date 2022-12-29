import styled from "@emotion/styled";
import dayjs from "dayjs";
import { getUserState } from "../../utils/steamTools";
import { Col, Row } from "../common";

export const SteamProfileDisplay = ({
  avatarfull,
  personaname,
  timecreated,
  personastate,
  style,
}) => {
  return (
    <Container style={style}>
      <Avatar src={avatarfull} alt="avatar" />

      <Col style={{ gap: ".25rem" }}>
        <Header>{personaname}</Header>
        <Subheader>
          <strong>Created: </strong>
          {dayjs.unix(timecreated).format("Do MMM YYYY")}
        </Subheader>
        <Subheader>{getUserState(personastate)}</Subheader>
      </Col>
    </Container>
  );
};

const Container = styled(Row)`
  background-color: #1d2a3a;
  border-radius: 0 0 16px 16px;
  padding: 1.5rem;
  margin-right: 1rem;
`;
const Avatar = styled.img`
  margin-right: 1rem;
`;
const Header = styled.h2`
  margin-bottom: 0.25rem;
`;
const Subheader = styled.p`
  font-size: 0.8rem;
`;
