import styled from "@emotion/styled";
import { getPlaytime } from "../../utils/steamTools";
import { Row } from "../common";

const Playtime = ({ time }) => (
  <Container>Played: {getPlaytime(time)}</Container>
);

const Container = styled(Row)`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  padding: 0.5rem;
`;

const InfoItems = { Playtime };

export default InfoItems;
