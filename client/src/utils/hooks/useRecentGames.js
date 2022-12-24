import { useQuery } from "@tanstack/react-query";
import { fetchRecentSteamGames } from "../apis/steam.apis";

const KEY = "RECENT_GAMES";

export const useRecentGames = (steamId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, steamId],
    queryFn: async () => {
      if (!steamId) return [];
      const data = await fetchRecentSteamGames(steamId);
      return data.games;
    },
  });

  return [data, { isLoading, error }];
};
