import { useFavAchievements } from "../../utils/hooks";
import { Page, Row } from "../../components/common";
import { groupAchievementsByAppid } from "./AchievementWatchlist.helpers";
import { AchievementDisplayList } from "../../components/achievements/AchievementDisplayList";
import styled from "@emotion/styled";

export const AchievementWatchlistPage = () => {
  const [favAchievements, { isLoading, error }] = useFavAchievements();
  const groupedAchievements = groupAchievementsByAppid(favAchievements);

  const renderPageHeader = () => {
    return (
      <Row style={{ marginBottom: "1rem" }}>
        <Title>Achievement Watchlist</Title>
      </Row>
    );
  };

  const renderAchivementLists = () => {
    if (isLoading || error) return null;

    const renderList = () => {
      return Object.keys(groupedAchievements).map((appid) => (
        <AchievementDisplayList
          key={appid}
          appid={appid}
          achievements={groupedAchievements[appid]}
        />
      ));
    };

    return <ListContainer>{renderList()} </ListContainer>;
  };

  return (
    <Page style={{ margin: "1rem", marginLeft: 0 }}>
      {renderPageHeader()}
      {renderAchivementLists()}
    </Page>
  );
};

const Title = styled.h2``;
const ListContainer = styled(Row)`
  gap: 1rem;
`;
