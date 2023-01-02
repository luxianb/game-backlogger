import styled from "@emotion/styled";
import { Trophy } from "akar-icons";
import { Col, Progressbar, Row } from "../../components/common";

export const AchievementProgress = ({ current, total, style, ...props }) => {
  const percentage = Math.floor((current / total) * 100);

  const renderContent = () => {
    if (percentage === 100)
      return (
        <CompletedContainer>
          <Trophy strokeWidth={2} size={60} />
          <p>{`${current}/${total}`}</p>
          <Header>{`All achievement unlocked!`}</Header>
        </CompletedContainer>
      );

    return (
      <>
        <Row style={{ gap: ".5rem", alignItems: "center" }}>
          <Trophy strokeWidth={2} size="1.25rem" />
          <Header>
            {`Unlocked achievements ${current}/${total} (${percentage}%)`}
          </Header>
        </Row>
        <Progress current={current} total={total} />
      </>
    );
  };

  return (
    <Container style={style} {...props}>
      {renderContent()}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  gap: 1rem;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;
const CompletedContainer = styled(Col)`
  align-items: center;
  flex: 1;
  gap: 1rem;
`;
const Header = styled.h3``;
const Progress = styled(Progressbar)`
  height: 10px;
  width: auto;
`;
