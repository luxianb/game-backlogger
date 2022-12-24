import { useQuery } from "@tanstack/react-query";
import { fetchAllSteamGames } from "../apis/steam.apis";

const KEY = "ALL_GAMES";

export const useAllGames = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: () => fetchAllSteamGames(),
  });

  return [data, { isLoading, error }];
};
