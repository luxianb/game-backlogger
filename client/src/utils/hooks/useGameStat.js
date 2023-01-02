import { useQuery } from "@tanstack/react-query";
import { fetchSteamGameStat } from "../apis/steam.apis";

const KEY = "GAME_STAT";

export const useGameStat = (appid) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, { appid }],
    queryFn: () => fetchSteamGameStat(appid),
  });

  return [data, { isLoading, error }];
};
