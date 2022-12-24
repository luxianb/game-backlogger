import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Page, Row } from "../../components/common";
import { AchievementItem } from "../../components/steam/AchievementItem";
import { BoxArt } from "../../components/steam/BoxArt";
import { HeroBanner } from "../../components/steam/HeroBanner";
import { useGameData, useSteamId } from "../../utils/hooks";
import { useFavAchievements } from "../../utils/hooks/useFavAchievements";
import { useGameAchievements } from "../../utils/hooks/useGameAchievements";

export const GameDetailsPage = () => {
  const params = useParams();
  const [game] = useGameData(params?.appid);
  const steamId = useSteamId();
  const [achievements] = useGameAchievements(steamId, params?.appid);
  const containerRef = useRef();
  const [favAchievements] = useFavAchievements(params?.appid);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const height = containerRef.current.clientHeight.toFixed(2) * 0.75;
    if (containerHeight !== height) {
      setContainerHeight(height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef?.current?.clientHeight]);

  const renderAchievementHeader = () => {
    const achieved = achievements.filter((item) => item.achieved).length;
    const total = achievements.length;

    return <h3>{`Achievements (${achieved}/${total})`}</h3>;
  };

  const renderAchievements = () => {
    if (!achievements.length) return null;

    const renderList = () =>
      achievements.map((item) => {
        const prop = {
          ...item,
          appid: params?.appid,
          favourited: favAchievements.some(
            ({ gameid, achievementid }) =>
              gameid === params?.appid && achievementid === item.apiname
          ),
        };
        return <AchievementItem key={item.apiname} {...prop} />;
      });

    return <Col>{renderList()}</Col>;
  };

  return (
    <Page>
      <HeroBanner appid={params?.appid} />

      <DetailContainer
        style={{ marginBottom: -containerHeight || "unset" }}
        ref={containerRef}
      >
        <BoxArt appid={params?.appid} />
        <TextContainer>
          <h1>{game?.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: game?.short_description }} />
        </TextContainer>
      </DetailContainer>

      <ContentContainer>
        {renderAchievementHeader()}
        {renderAchievements()}
      </ContentContainer>
    </Page>
  );
};

const DetailContainer = styled(Row)`
  transform: translateY(-75%);
  gap: 1rem;
  padding: 0 1rem;
`;
const TextContainer = styled(Col)`
  gap: 0.5rem;
  color: white;
`;

const ContentContainer = styled(Col)`
  padding: 0 1rem;
  margin-top: 1rem;
  gap: 0.5rem;
`;
