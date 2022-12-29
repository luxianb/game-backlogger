import { useQuery } from "@tanstack/react-query";
import { fetchSteamGameStat } from "../apis/steam.apis";

const KEY = "GAME_STAT";

export const useGameStat = (steamid, appid) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, { steamid, appid }],
    queryFn: () => fetchSteamGameStat(steamid, appid),
  });

  return [data, { isLoading, error }];
};
