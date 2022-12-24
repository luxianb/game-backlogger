import styled from "@emotion/styled";
import { Col, Row } from "../common";
import dayjs from "dayjs";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useToggleFavAchievement } from "../../utils/hooks/useFavAchievements";

export const AchievementItem = (props) => {
  const toggleFav = useToggleFavAchievement();
  const {
    appid,
    apiname,
    achieved,
    icon,
    icongray,
    name,
    description,
    unlocktime,
    favourited,
  } = props;

  const getUnlockTime = (time) => dayjs.unix(time).format("D MMM 'YY, h:mmA");

  const handleToggleFav = async () => {
    const postBody = {
      gameid: appid,
      achievementid: apiname,
      name: name,
      description: description,
      icon: icongray,
      achieved: achieved,
    };
    toggleFav.mutate(postBody);
  };

  return (
    <Container>
      <Icon src={achieved ? icon : icongray} alt="achievement-icon" />
      <Col>
        <Header>{name}</Header>
        {description && <Subheader>{description}</Subheader>}
        {Boolean(achieved) && (
          <Subheader>{`Unlocked: ${getUnlockTime(unlocktime)}`}</Subheader>
        )}
      </Col>

      <Clickable onClick={handleToggleFav}>
        {!favourited ? <BsBookmark /> : <BsBookmarkFill />}
      </Clickable>
    </Container>
  );
};

const Container = styled(Row)``;
const Icon = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 1rem;
`;
const Header = styled.h4`
  margin-bottom: 0.5rem;
`;
const Subheader = styled.p``;
const Clickable = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
