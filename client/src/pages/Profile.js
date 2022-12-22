import { Col, Page, Row } from "../components/common";
import Navbar from "../layouts/navbar/Navbar";
import { Link } from "react-router-dom";
import { useRecentGames } from "../utils/hooks/useRecentGames";
import { useSteamId } from "../utils/hooks/useSteamId";
import { useSteamProfile, useUserGamelist } from "../utils/hooks";
import {
  getGameImageUrl,
  getPlaytime,
  getUserState,
} from "../utils/steamTools";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { useState } from "react";
dayjs.extend(advancedFormat);

export const ProfilePage = () => {
  const steamId = useSteamId();
  const [recentGames] = useRecentGames(steamId);
  const [gameList] = useUserGamelist(steamId);
  const [profile] = useSteamProfile(steamId);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("NAME");

  const renderSteamProfile = () => {
    if (!profile) return null;
    return (
      <Row>
        <img src={profile.avatarfull} alt="avatar" />
        <Col>
          <h2>{profile.personaname}</h2>
          <p>
            Created: {dayjs.unix(profile.timecreated).format("Do MMM YYYY")}
          </p>
          <p>
            Last Logoff:{" "}
            {dayjs.unix(profile.lastlogoff).format("Do MMM YYYY, h:mmA")}
          </p>
          <p>
            Last Logoff:{" "}
            {dayjs.unix(profile.lastlogoff).format("Do MMM YYYY, h:mmA")}
          </p>
          <p>{getUserState(profile?.personastate)}</p>
        </Col>
      </Row>
    );
  };

  const renderRecentGames = () => {
    if (!recentGames.length) return null;

    const content = () =>
      recentGames.map((game) => (
        <Row key={`rg-${game.appid}`} style={{ minWidth: 300 }}>
          <Link to={`/game/${game.appid}`}>
            <img
              src={getGameImageUrl(game.appid, game?.img_icon_url)}
              alt="game_thumbnail"
              style={{ height: 50, width: 50 }}
            />
          </Link>
          <Col>
            <p>{game?.name}</p>
            {game?.playtime_forever && (
              <p>Total playtime: {getPlaytime(game?.playtime_forever)}</p>
            )}
            {game?.playtime_2weeks && (
              <p>Last 2 weeks: {getPlaytime(game?.playtime_2weeks)}</p>
            )}
          </Col>
        </Row>
      ));

    return <Row style={{ overflowX: "auto" }}>{content()}</Row>;
  };

  const renderGameList = () => {
    if (!gameList.length) return null;

    const handleListSort = (a, b) => {
      switch (sortCriteria) {
        case "MOST_PLAYED":
          return b.playtime_forever - a.playtime_forever;
        case "LEAST_PLAYED":
          return a.playtime_forever - b.playtime_forever;
        case "NAME":
        default: {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }
      }
    };

    const content = () =>
      gameList
        .filter((game) => game.img_icon_url)
        .filter((game) => {
          if (!searchQuery) return true;
          return game.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort(handleListSort)
        .map((game, index, arr) => {
          console.log(arr);
          return (
            <Row key={`gl-${game.appid}`} style={{ width: 300 }}>
              <Link to={`/game/${game.appid}`}>
                <img
                  src={getGameImageUrl(game.appid, game?.img_icon_url)}
                  alt="game_thumbnail"
                  style={{ height: 50, width: 50 }}
                />
              </Link>
              <Col>
                <p>{game?.name}</p>
                {game?.playtime_forever > 0 && (
                  <p>Total playtime: {getPlaytime(game?.playtime_forever)}</p>
                )}
              </Col>
            </Row>
          );
        });
    return (
      <Col
        style={{
          overflowX: "auto",
          flexWrap: "wrap",
          maxHeight: 600,
        }}
      >
        {content()}
      </Col>
    );
  };

  return (
    <Page>
      <Navbar />
      {renderSteamProfile()}
      {renderRecentGames()}
      <Row>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search games"
        />
        <select
          placeholder="Sort by"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="NAME">Name</option>
          <option value="MOST_PLAYED">Most played</option>
          <option value="LEAST_PLAYED">Least played</option>
        </select>
      </Row>
      {renderGameList()}
    </Page>
  );
};
