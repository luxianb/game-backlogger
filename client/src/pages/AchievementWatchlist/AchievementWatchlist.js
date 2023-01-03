import { useElementSize } from "../../utils/hooks";
import { Page, Row, Select } from "../../components/common";
import { DragDropContext } from "react-beautiful-dnd";
import {
  getListFilterFunction,
  getListSortingFunction,
} from "./AchievementWatchlist.helpers";
import { AchievementDisplayList } from "../../components/achievements/AchievementDisplayList";
import styled from "@emotion/styled";
import { useState } from "react";
import { SearchInput } from "../../components/common/SearchInput";
import { useSearchParamsState } from "../../utils/hooks/useSearchParamsState";
import { useFavAchievementLists } from "../../utils/hooks/useFavAchievementLists";

export const AchievementWatchlistPage = () => {
  const [achievementLists, achievementListsState] = useFavAchievementLists();
  const [pageSize, setPageSize] = useState(null);
  const [headerRef, headerSize] = useElementSize();
  const [searchParams, setSearchParams] = useSearchParamsState({
    filter: "",
    sorting: "position",
  });

  const renderPageHeader = () => {
    const sortOptions = [
      { value: "position", label: "Position" },
      { value: "name", label: "Name" },
      // { value: "most_played", label: "Most played" },
      // { value: "least_played", label: "Least played" },
    ];
    const defaultSortValue = sortOptions.find(
      ({ value }) => value === searchParams.get("sorting")
    );

    return (
      <HeaderContainer ref={headerRef}>
        <Title>Achievement Watchlist</Title>

        <ControlContainer>
          <SearchInput
            placeholder="Search games"
            value={searchParams.get("filter")}
            onChange={(e) => setSearchParams({ filter: e.target.value })}
          />
          <Select
            placeholder="Sort by"
            defaultValue={defaultSortValue}
            onChange={(e) => setSearchParams({ sorting: e.value })}
            options={sortOptions}
          />
        </ControlContainer>
      </HeaderContainer>
    );
  };

  const renderAchivementLists = () => {
    if (
      achievementListsState.isLoading ||
      achievementListsState.error ||
      !headerSize ||
      !pageSize
    )
      return null;

    const listSortFunction = getListSortingFunction(
      searchParams.get("sorting")
    );
    const listFilterFunction = getListFilterFunction(
      searchParams.get("filter")
    );

    const renderList = () => {
      return achievementLists
        .sort(listSortFunction)
        .filter(listFilterFunction)
        .map((list) => (
          <AchievementDisplayList
            key={list.appid}
            appid={list.appid}
            achievements={list.achievements}
            style={{ maxHeight: pageSize - headerSize - 16 }}
          />
        ));
    };

    return <ListContainer>{renderList()}</ListContainer>;
  };

  return (
    <Page getParentSize={(size) => size?.height && setPageSize(size?.height)}>
      {renderPageHeader()}
      {renderAchivementLists()}
    </Page>
  );
};

const HeaderContainer = styled(Row)`
  padding: 1rem;
  padding-left: 0;
  align-items: center;
`;
const ControlContainer = styled(Row)`
  margin-left: auto;
  gap: 0.5rem;
`;
const Title = styled.h1``;
const ListContainer = styled(Row)`
  gap: 1rem;
`;
