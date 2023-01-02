import { useQuery } from "@tanstack/react-query";
import { fetchSteamUserGamelist } from "../apis/steam.apis";

const KEY = "GAME_LIST";

export const useUserGamelist = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const data = await fetchSteamUserGamelist();
      return data.games || [];
    },
  });

  return [data, { isLoading, error }];
};
