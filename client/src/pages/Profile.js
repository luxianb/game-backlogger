import { Col, Page } from "../components/common";
import Navbar from "../layouts/navbar/Navbar";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Link } from "react-router-dom";
import { useRecentGames } from "../utils/hooks/useRecentGames";
import { useSteamId } from "../utils/hooks/useSteamId";
import { useUserGamelist } from "../utils/hooks";
dayjs.extend(duration);

export const ProfilePage = () => {
  const steamId = useSteamId();
  const [recentGames] = useRecentGames(steamId);
  const [gameList] = useUserGamelist(steamId);
  console.log("🚀  gameList", gameList);

  const getTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    let string = "";
    if (hours) string = `${hours}hr `;
    if (minutes) string += `${minutes}mins`;
    return string;
  };

  return (
    <Page>
      <Navbar />
      {recentGames.length > 0 &&
        recentGames.map((item) => (
          <Col key={item.appid}>
            <Link to={`/game/${item.appid}`}>
              <img
                src={item?.img_icon_url}
                alt="game_thumbnail"
                style={{ height: 50, width: 50 }}
              />
            </Link>
            <p>{item?.name}</p>
            {item?.playtime_forever && (
              <p>Total playtime: {getTime(item?.playtime_forever)}</p>
            )}
            {item?.playtime_2weeks && (
              <p>Last 2 weeks: {getTime(item?.playtime_2weeks)}</p>
            )}
          </Col>
        ))}
    </Page>
  );
};
