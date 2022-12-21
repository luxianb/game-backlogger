import { useEffect, useState } from "react";
import { fetchSteamGameInfo } from "../apis/steam.apis";

export const useGameData = (appid) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (appid) {
      getGameData(appid);
    } else {
      setGame(null);
    }
  }, [appid]);

  const getGameData = async (appid) => {
    const data = await fetchSteamGameInfo(appid);
    setGame(data);
  };

  return [game, setGame];
};
