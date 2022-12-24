import { useQuery } from "@tanstack/react-query";
import { fetchSteamGameInfo } from "../apis/steam.apis";

const KEY = "GAME_DETAIL";

export const useGameData = (appid) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, appid],
    queryFn: () => fetchSteamGameInfo(appid),
  });

  return [data, { isLoading, error }];
};
