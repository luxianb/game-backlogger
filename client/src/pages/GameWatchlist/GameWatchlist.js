import styled from "@emotion/styled";
import { Page, Row, Select } from "../../components/common";
import { SearchInput } from "../../components/common/SearchInput";
import { useDetailedFavGames } from "../../utils/hooks/useDetailedFavGames";
import { useSearchParamsState } from "../../utils/hooks/useSearchParamsState";
import {
  getListFilterFunction,
  getListSortingFunction,
} from "./GameWatchlist.helpers";
import { WatchListItem } from "./GameWatchlist.Item";

export const GameWatchlistPage = () => {
  const [favGames, favGameState] = useDetailedFavGames();
  const [searchParams, setSearchParams] = useSearchParamsState({
    filter: "",
    sorting: "position",
  });

  const renderHeader = () => {
    if (favGameState.isLoading || favGameState.error) return;

    const sortOptions = [
      { value: "position", label: "Position" },
      { value: "name", label: "Name" },
      { value: "most_played", label: "Most played" },
      { value: "least_played", label: "Least played" },
    ];

    return (
      <HeaderContainer>
        <Title>{`Game Watchlist (${favGames?.length})`}</Title>

        <ControlContainer>
          <SearchInput
            placeholder="Search games"
            value={searchParams.get("filter") || ""}
            onChange={(e) => setSearchParams({ filter: e.target.value })}
          />
          <Select
            placeholder="Sort by"
            defaultValue={sortOptions.find(
              ({ value }) => value === searchParams.get("sorting")
            )}
            onChange={(e) => setSearchParams({ sorting: e.value })}
            options={sortOptions}
          />
        </ControlContainer>
      </HeaderContainer>
    );
  };

  const renderGameList = () => {
    if (favGameState.isLoading || favGameState.error || !favGames) return;

    const listFilterFunction = getListFilterFunction(
      searchParams.get("filter")
    );
    const listSortFunction = getListSortingFunction(
      searchParams.get("sorting")
    );

    const renderList = () => {
      return favGames
        .filter(listFilterFunction)
        .sort(listSortFunction)
        .map((game) => (
          <WatchListItem
            key={`${game?.appid}`}
            appid={game?.appid}
            details={game}
          />
        ));
    };

    return <GameContainer>{renderList()}</GameContainer>;
  };

  return (
    <Page>
      {renderHeader()}
      {renderGameList()}
    </Page>
  );
};

const HeaderContainer = styled(Row)`
  margin: 1rem;
  margin-left: 0;
  align-items: center;
`;
const ControlContainer = styled(Row)`
  margin-left: auto;
  gap: 0.5rem;
`;
const Title = styled.h1``;
const GameContainer = styled(Row)`
  flex-wrap: wrap;
  gap: 1rem;
`;
