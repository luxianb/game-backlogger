import { useEffect, useState } from "react";
import { fetchSteamUserGamelist } from "../apis/steam.apis";

export const useUserGamelist = (steamId) => {
  const [gamelist, setGamelist] = useState([]);

  useEffect(() => {
    if (steamId) {
      getUserGamelist(steamId);
    } else {
      setGamelist([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steamId]);

  const getUserGamelist = async (steamId) => {
    const data = await fetchSteamUserGamelist(steamId);
    console.log("🚀  data", data);
    setGamelist(data.games);
  };

  return [gamelist, setGamelist];
};
