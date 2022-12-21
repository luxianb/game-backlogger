import { useEffect, useState } from "react";
import { fetchRecentSteamGames } from "../apis/steam.apis";

export const useRecentGames = (steamId) => {
  const [recentGames, setRecentGames] = useState([]);
  useEffect(() => {
    if (steamId) {
      getRecentGames(steamId);
    } else {
      setRecentGames([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steamId]);

  const getRecentGames = async (steamId) => {
    const data = await fetchRecentSteamGames(steamId);
    // console.log("🚀  recentGames", recentGames);
    setRecentGames(data.games);
  };

  return [recentGames, setRecentGames];
};
