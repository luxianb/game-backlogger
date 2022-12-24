import { useEffect, useState } from "react";
import { fetchAllSteamGames } from "../apis/steam.apis";

export const useAllGames = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getRecentGames();
  }, []);

  const getRecentGames = async () => {
    const data = await fetchAllSteamGames();
    setGames(data);
  };

  return games;
};
