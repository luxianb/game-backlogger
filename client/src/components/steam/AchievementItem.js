import styled from "@emotion/styled";
import { Col, Row } from "../common";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useToggleFavAchievement } from "../../utils/hooks/useFavAchievements";
import { css } from "@emotion/react";

dayjs.extend(advancedFormat);
const getUnlockTime = (time) => dayjs.unix(time).format("Do MMM YYYY, h:mmA");

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
    hidden,
  } = props;

  const handleToggleFav = async () => {
    const postBody = {
      gameid: appid,
      achievementid: apiname,
      name: name,
      description: description,
      icon: icon,
      icongray: icongray,
      achieved: achieved,
    };
    toggleFav.mutate(postBody);
  };

  return (
    <Container hidden={hidden} achieved={achieved}>
      <Icon
        src={achieved ? icon : icongray}
        alt="achievement-icon"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = icon;
        }}
      />
      <Col>
        <Header>{name}</Header>
        {description && <Subheader>{description}</Subheader>}
        {Boolean(achieved) && (
          <UnlockTime>{`Unlocked: ${getUnlockTime(unlocktime)}`}</UnlockTime>
        )}
      </Col>

      {!achieved && (
        <Clickable onClick={handleToggleFav}>
          {!favourited ? <BsBookmark /> : <BsBookmarkFill />}
        </Clickable>
      )}
    </Container>
  );
};

const Container = styled(Row)`
  min-width: 450px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  ${getHiddenStyle}
`;
function getHiddenStyle({ hidden, achieved }) {
  if (hidden && !achieved)
    return css`
      opacity: 0.5;
    `;
}
const Icon = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 0.5rem;
`;
const Header = styled.h3``;
const Subheader = styled.p``;
const UnlockTime = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
const Clickable = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
