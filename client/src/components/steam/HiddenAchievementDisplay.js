import styled from "@emotion/styled";
import { Row } from "../common";

export const HiddenAchievementDisplay = ({ amount }) => {
  if (!amount) return null;

  return (
    <Container>
      <Text>{`+${amount} Hidden achievements`}</Text>
    </Container>
  );
};

const Container = styled(Row)`
  min-width: 450px;
  min-height: 100px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem 2rem;
`;
const Text = styled.h3``;
