import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Page, Row } from "../../../components/common";
import { AchievementItem } from "../../../components/steam/AchievementItem";
import { BoxArt } from "../../../components/steam/BoxArt";
import { HeroBanner } from "../../../components/steam/HeroBanner";
import {
  useElementSize,
  useGameData,
  useSteamId,
  useGameAchievements,
  useFavAchievements,
  useUserGameDetails,
} from "../../../utils/hooks";
import { css } from "@emotion/react";
import {
  getFavourited,
  getFilterFunction,
  getSortingFunction,
  getViewFilterFunction,
} from "./GameDetails.helpers";
import { HIDE_HIDDEN, SHOW_ALL } from "./GameDetails.contants";
import { useState } from "react";
import InfoItems from "../../../components/steam/InfoItems";
import { BackButton } from "./GameDetails.BackButton";
import { FavToggle } from "./GameDetails.FavToggle";
import { HiddenAchievementDisplay } from "../../../components/steam/HiddenAchievementDisplay";
import {
  useFavGames,
  useToggleFavGames,
} from "../../../utils/hooks/useFavGames";

export const GameDetailsPage = () => {
  const params = useParams();
  const { appid } = params;
  const [game] = useGameData(params?.appid);
  const [steamId] = useSteamId();
  const [details] = useUserGameDetails(steamId, appid);
  const [achievements] = useGameAchievements(steamId, params?.appid);
  const [favAchievements] = useFavAchievements(params?.appid);
  const [favGame] = useFavGames(params?.appid);
  const toggleGameFav = useToggleFavGames();
  const [containerRef, containerSize] = useElementSize();
  const navigate = useNavigate();
  const [viewFilter, setViewFilter] = useState(HIDE_HIDDEN);

  const unlockedAchievements = achievements?.filter((item) => item.achieved);
  const lockedAchievements = achievements?.filter((item) => !item.achieved);
  const hiddenAchievements = achievements?.filter(
    (item) => !item.achieved && item.hidden
  );

  function handleToggleFavGame() {
    const payload = {
      gameid: params?.appid,
    };
    toggleGameFav.mutate(payload);
  }

  function getFallbackImage() {
    if (!game?.screenshots?.length || !game?.screenshots) return null;

    const index = Math.floor(Math.random() * game.screenshots.length);

    return game?.screenshots[index]?.path_full;
  }

  const renderDetailsContainer = () => {
    const getOffsetStyle = () => {
      const styles = { marginBottom: "unset" };
      if (containerSize) styles.marginBottom = -containerSize * 0.75;
      return styles;
    };

    return (
      <DetailContainer style={getOffsetStyle()} ref={containerRef}>
        <BoxArt appid={params?.appid} />
        <TextContainer>
          <h1>{game?.name || details?.name}</h1>
          <p style={{ fontSize: ".8rem", opacity: 0.8, marginTop: -8 }}>
            {game?.release_date?.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: game?.short_description }} />
          <Row>
            {Boolean(details?.playtime_forever) && (
              <InfoItems.Playtime time={details?.playtime_forever} />
            )}
          </Row>
        </TextContainer>
      </DetailContainer>
    );
  };

  const renderAchievementHeader = () => {
    const achieved = achievements?.filter((item) => item.achieved)?.length ?? 0;
    const total = achievements?.length ?? 0;

    return <h2>{`Achievements (${achieved}/${total})`}</h2>;
  };

  const renderViewSelector = () => {
    const options = [
      { value: HIDE_HIDDEN, label: "Hide hidden" },
      { value: SHOW_ALL, label: "Show all" },
    ];

    return (
      <select
        value={viewFilter}
        onChange={(e) => setViewFilter(e.target.value)}
        style={{ marginLeft: "auto" }}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  };

  const renderAchievements = (filter, direction) => {
    if (!achievements?.length) return null;
    const achivementFilter = getFilterFunction(filter);
    const sortFunction = getSortingFunction(filter);
    const viewFilterFunction = getViewFilterFunction(filter, viewFilter);

    const renderList = () =>
      achievements
        .filter(achivementFilter)
        .sort(sortFunction)
        .filter(viewFilterFunction)
        .map((item) => {
          const favourited = getFavourited(item, favAchievements);
          const prop = { ...item, appid, favourited };
          return <AchievementItem key={item.apiname} {...prop} />;
        });

    const renderHiddenAchievements = () => {
      if (filter !== "incompleted" || viewFilter !== HIDE_HIDDEN) return null;
      return <HiddenAchievementDisplay amount={hiddenAchievements.length} />;
    };

    return (
      <AchievementListContainer direction={direction}>
        {renderList()}
        {renderHiddenAchievements()}
      </AchievementListContainer>
    );
  };

  return (
    <Page>
      <HeroBanner appid={params?.appid} fallback={getFallbackImage()} />
      <BackButton onClick={() => navigate(-1)} css={styles.backButton} />
      <FavToggle
        css={styles.favToggle}
        toggled={favGame}
        onClick={handleToggleFavGame}
      />
      {renderDetailsContainer()}

      <ContentContainer>
        <Row style={{ marginBottom: ".5rem" }}>
          {renderAchievementHeader()}
          {renderViewSelector()}
        </Row>

        {unlockedAchievements.length !== achievements?.length ? (
          <>
            {unlockedAchievements.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <AchievementHeader>Unlocked</AchievementHeader>
                {renderAchievements("completed", "horizontal")}
              </div>
            )}

            <AchievementHeader>Locked</AchievementHeader>
            {renderAchievements("incompleted")}
          </>
        ) : (
          <>{renderAchievements()}</>
        )}
      </ContentContainer>
    </Page>
  );
};

const styles = {
  backButton: css`
    z-index: 10;
    position: absolute;
    top: 1rem;
    left: 1rem;
  `,
  favToggle: css`
    z-index: 10;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  `,
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
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;
const AchievementHeader = styled.h3`
  margin-bottom: 0.5rem;
`;
const AchievementListContainer = styled(Col)`
  gap: 0.5rem;
  ${getDirectionStyle};
`;
function getDirectionStyle({ direction }) {
  switch (direction) {
    case "horizontal":
      return css`
        flex-direction: row;
        overflow-x: auto;
      `;
    case "vertical":
    default:
      return css`
        flex-direction: column;
      `;
  }
}
