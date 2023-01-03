import styled from "@emotion/styled";
import { Page, Row } from "../../components/common";
import { useFavGames } from "../../utils/hooks/useFavGames";
import { WatchListItem } from "./GameWatchlist.Item";

export const GameWatchlistPage = () => {
  const [favGames] = useFavGames();

  const renderGameList = () => {
    if (!favGames) return;

    return favGames.map((game) => (
      <WatchListItem key={game?.appid} appid={game?.appid} />
    ));
  };

  return (
    <Page>
      <Title>Game Watchlist</Title>
      <GameContainer>{renderGameList()}</GameContainer>
    </Page>
  );
};

const Title = styled.h1`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const GameContainer = styled(Row)`
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 2rem;
`;
