import { useQuery } from "@tanstack/react-query";
import { fetchRecentSteamGames } from "../apis/steam.apis";

const KEY = "RECENT_GAMES";

export const useRecentGames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const data = await fetchRecentSteamGames();
      return data.games;
    },
  });

  return [data, { isLoading, error }];
};
