import { useQuery } from "@tanstack/react-query";
import { fetchSteamUserGameDetails } from "../apis/steam.apis";

const KEY = "USER_GAME_DETAILS";

export const useUserGameDetails = (steamId, appId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, { steamId, appId }],
    queryFn: async () => {
      if (!steamId || !appId) return {};
      const data = await fetchSteamUserGameDetails(steamId, appId);
      return data;
    },
  });

  return [data, isLoading, error];
};
