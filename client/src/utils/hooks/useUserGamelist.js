import { useQuery } from "@tanstack/react-query";
import { fetchSteamUserGamelist } from "../apis/steam.apis";

const KEY = "GAME_LIST";

export const useUserGamelist = (steamId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, steamId],
    queryFn: async () => {
      if (!steamId) return [];
      const data = await fetchSteamUserGamelist(steamId);
      return data.games;
    },
  });

  return [data, { isLoading, error }];
};
