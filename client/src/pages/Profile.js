import { Col, Page, Row } from "../components/common";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useRecentGames } from "../utils/hooks/useRecentGames";
import { useSteamId } from "../utils/hooks/useSteamId";
import { useSteamProfile, useUserGamelist } from "../utils/hooks";
import {
  getGameImageUrl,
  getPlaytime,
  getUserState,
} from "../utils/steamTools";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useSearchParamsState } from "../utils/hooks/useSearchParamsState";
import dayjs from "dayjs";
import { GameItem } from "../components/steam/GameItem";
import { SteamProfileDisplay } from "../components/steam/SteamProfileDisplay";
dayjs.extend(advancedFormat);

export const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParamsState();
  const [steamId] = useSteamId();
  const [recentGames, { isLoading }] = useRecentGames(steamId);
  const [gameList] = useUserGamelist(steamId);
  const [profile] = useSteamProfile(steamId);

  const renderSteamProfile = () => {
    if (!profile) return null;
    return (
      <SteamProfileDisplay {...profile} style={{ marginBottom: "2rem" }} />
    );
  };

  const renderRecentGames = () => {
    if (isLoading || !recentGames.length) return null;

    const content = () =>
      recentGames.map((game) => (
        <GameItem key={`rg-${game.appid}`} {...game} />
      ));

    return <Row style={{ overflowX: "auto", gap: ".5rem" }}>{content()}</Row>;
  };

  const renderGameList = () => {
    if (!gameList?.length) return null;

    const handleListSort = (a, b) => {
      switch (searchParams.get("sorting")) {
        case "most_played":
          return b.playtime_forever - a.playtime_forever;
        case "least_played":
          return a.playtime_forever - b.playtime_forever;
        case "name":
        default: {
          const _a = a.sort_as ?? a.name;
          const _b = b.sort_as ?? b.name;
          if (_a.toLowerCase() > _b.toLowerCase()) return 1;
          if (_a.toLowerCase() < _b.toLowerCase()) return -1;
          return 0;
        }
      }
    };

    const renderGames = () =>
      gameList
        .filter((game) => game.img_icon_url)
        .filter((game) => {
          if (!searchParams.get("filter")) return true;
          return game.name
            .toLowerCase()
            .includes(searchParams.get("filter").toLowerCase());
        })
        .sort(handleListSort)
        .map((game) => {
          return <GameItem key={`gl-${game.appid}`} {...game} />;
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

      <Col style={{ gap: ".5rem" }}>
        <Row style={{ justifyContent: "space-between", marginRight: "1rem" }}>
          <h2>All Games</h2>
          <Row style={{ gap: ".5rem" }}>
            <input
              value={searchParams.get("filter")}
              onChange={(e) => setSearchParams({ filter: e.target.value })}
              placeholder="Search games"
            />
            <select
              placeholder="Sort by"
              value={searchParams.get("sorting")}
              onChange={(e) => setSearchParams({ sorting: e.target.value })}
            >
              <option value="name">Name</option>
              <option value="most_played">Most played</option>
              <option value="least_played">Least played</option>
            </select>
          </Row>
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
