import styled from "@emotion/styled";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Page, Row } from "../../components/common";
import { AchievementItem } from "../../components/steam/AchievementItem";
import { BoxArt } from "../../components/steam/BoxArt";
import { HeroBanner } from "../../components/steam/HeroBanner";
import {
  useElementSize,
  useGameData,
  useGameAchievements,
  useFavAchievements,
  useUserGameDetails,
  useToggleFavAchievement,
} from "../../utils/hooks";
import { css } from "@emotion/react";
import {
  getFavourited,
  getFilterFunction,
  getSortingFunction,
  getViewFilterFunction,
} from "./GameDetails.helpers";
import { HIDE_HIDDEN, SHOW_ALL } from "./GameDetails.contants";
import { useState } from "react";
import InfoItems from "../../components/steam/InfoItems";
import { BackButton } from "./GameDetails.BackButton";
import { FavToggle } from "./GameDetails.FavToggle";
import { HiddenAchievementDisplay } from "../../components/steam/HiddenAchievementDisplay";
import { useFavGames, useToggleFavGames } from "../../utils/hooks/useFavGames";
import { AchievementProgress } from "./GameDetails.AchievementProgress";

export const GameDetailsPage = () => {
  const params = useParams();
  const { appid } = params;
  const [game] = useGameData(params?.appid);
  const [details] = useUserGameDetails(appid);
  const [
    achievements,
    { isLoading: isLoadingAchievements, error: achievementError },
  ] = useGameAchievements(appid);
  const [favAchievements] = useFavAchievements(appid);
  const [favGame] = useFavGames(appid);
  const toggleGameFav = useToggleFavGames(appid);
  const toggleAchievementFav = useToggleFavAchievement(appid);
  const [containerRef, containerSize] = useElementSize();
  const navigate = useNavigate();
  const [viewFilter, setViewFilter] = useState(HIDE_HIDDEN);

  const unlockedAchievements = achievements?.filter((item) => item.achieved);
  const lockedAchievements = achievements?.filter((item) => !item.achieved);
  // prettier-ignore
  const hiddenAchievements = achievements?.filter((item) => !item.achieved && item.hidden);

  function handleToggleFavGame() {
    const payload = {
      appid: params?.appid,
    };
    toggleGameFav.mutate(payload);
  }

  async function handleAddAllToWatchlist() {
    const achievementsToAdd = lockedAchievements.filter(
      ({ apiname }) => !favAchievements.some((item) => item.apiname === apiname)
    );

    if (achievementsToAdd.length) {
      for (let i = 0; i < achievementsToAdd.length; i++) {
        const achievement = achievementsToAdd[i];
        const postBody = {
          appid: parseInt(appid),
          apiname: achievement.apiname,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          icongray: achievement.icongray,
          achieved: achievement.achieved,
        };
        if (i === 0) {
          await toggleAchievementFav.mutateAsync(postBody);
        } else {
          toggleAchievementFav.mutate(postBody);
        }
      }
    } else if (achievementsToAdd.length === 0) {
      for (let i = 0; i < lockedAchievements.length; i++) {
        const achievement = lockedAchievements[i];
        const postBody = {
          appid: parseInt(appid),
          apiname: achievement.apiname,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          icongray: achievement.icongray,
          achieved: achievement.achieved,
        };
        if (i === 0) {
          await toggleAchievementFav.mutateAsync(postBody);
        } else {
          toggleAchievementFav.mutate(postBody);
        }
      }
    }
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

  const renderAchievementDisplay = () => {
    if (isLoadingAchievements || achievementError) return null;
    return (
      <ContentContainer>
        <AchievementProgress
          total={achievements?.length}
          current={unlockedAchievements.length}
          css={styles.achievementProgress}
        />

        <Row style={{ marginBottom: ".5rem" }}>
          {renderAchievementHeader()}
          {renderViewSelector()}
        </Row>

        {unlockedAchievements.length !== achievements?.length ? (
          <>
            {unlockedAchievements.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <Header>Unlocked</Header>
                {renderAchievements("completed", "horizontal")}
              </div>
            )}

            <Row
              style={{
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: ".5rem",
              }}
            >
              <Header style={{ marginBottom: 0 }}>Locked</Header>
              <Button
                label={
                  favAchievements?.length >= lockedAchievements?.length
                    ? "Remove all from watchlist"
                    : "Add all to watchlist"
                }
                onClick={handleAddAllToWatchlist}
              />
            </Row>
            {renderAchievements("incompleted")}
          </>
        ) : (
          <>{renderAchievements()}</>
        )}
      </ContentContainer>
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
      {renderAchievementDisplay()}
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
  achievementProgress: css`
    margin-bottom: 1rem;
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
  padding-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 0.5rem;
`;
const Header = styled.h3`
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
        margin-right: -1rem;
      `;
    case "vertical":
    default:
      return css`
        flex-direction: column;
      `;
  }
}
