import styled from "@emotion/styled";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { Col, Page, Row, Select } from "../../components/common";
import { GameItem } from "../../components/steam/GameItem";
import { SteamProfileDisplay } from "../../components/steam/SteamProfileDisplay";
import { useRecentGames } from "../../utils/hooks/useRecentGames";
import { useSteamProfile, useUserGamelist } from "../../utils/hooks";
import { useSearchParamsState } from "../../utils/hooks/useSearchParamsState";
import {
  getListFilterFunction,
  getListSortingFunction,
} from "./Profile.helpers";
import { useFavGames } from "../../utils/hooks/useFavGames";
import { SearchInput } from "../../components/common/SearchInput";
dayjs.extend(advancedFormat);

export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParamsState({ filter: "" });
  const [recentGames, { isLoading }] = useRecentGames();
  const [favGames] = useFavGames();
  const [gameList] = useUserGamelist();
  const [profile] = useSteamProfile();

  const renderSteamProfile = () => {
    if (!profile) return null;
    return (
      <SteamProfileDisplay {...profile} style={{ marginBottom: "2rem" }} />
    );
  };

  const renderRecentGames = () => {
    if (isLoading || !recentGames.length) return null;

    const renderGames = () =>
      recentGames.map((game) => (
        <GameItem
          {...game}
          key={`rg-${game.appid}`}
          favourited={favGames?.some(
            ({ appid }) => parseInt(appid) === game.appid
          )}
        />
      ));

    return (
      <Row style={{ overflowX: "auto", gap: ".5rem" }}>{renderGames()}</Row>
    );
  };

  const renderGameListFilters = () => {
    const sortingOptions = [
      { value: "name", label: "Name" },
      { value: "most_played", label: "Most played" },
      { value: "least_played", label: "Least played" },
    ];

    return (
      <Row style={{ gap: ".5rem" }}>
        <SearchInput
          value={searchParams.get("filter") || ""}
          onChange={(e) => setSearchParams({ filter: e.target.value })}
          placeholder="Search games"
        />
        <Select
          placeholder="Sort by"
          defaultValue={sortingOptions.find(
            ({ value }) => value === searchParams.get("sorting")
          )}
          options={sortingOptions}
          onChange={(e) => setSearchParams({ sorting: e.value })}
        />
      </Row>
    );
  };

  const renderGameList = () => {
    if (!gameList?.length) return null;
    const listSortFunction = getListSortingFunction(
      searchParams.get("sorting")
    );
    const listFilterFunction = getListFilterFunction(
      searchParams.get("filter")
    );

    const renderGames = () =>
      gameList
        .filter(listFilterFunction)
        .sort(listSortFunction)
        .map((game) => {
          return (
            <GameItem
              {...game}
              key={`gl-${game.appid}`}
              favourited={favGames?.some(
                ({ appid }) => parseInt(appid) === game.appid
              )}
            />
          );
        });

    return <GamelistContainer>{renderGames()}</GamelistContainer>;
  };

  return (
    <Page>
      {renderSteamProfile()}

      <Col style={{ marginBottom: "2rem", gap: ".5rem" }}>
        <h2>Recent Games</h2>
        {renderRecentGames()}
      </Col>

      <Col style={{ gap: ".5rem", paddingBottom: "2rem" }}>
        <Row style={{ justifyContent: "space-between", marginRight: "1rem" }}>
          <h2>All Games</h2>
          {renderGameListFilters()}
        </Row>

        {renderGameList()}
      </Col>
    </Page>
  );
};

const GamelistContainer = styled(Col)`
  overflow-x: auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 600px;
  align-content: flex-start;
`;
