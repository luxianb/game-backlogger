import { useQuery } from "@tanstack/react-query";
import { fetchSteamUserGameDetails } from "../apis/steam.apis";

const KEY = "USER_GAME_DETAILS";

export const useUserGameDetails = (appId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, { appId }],
    queryFn: async () => {
      if (!appId) return {};
      const data = await fetchSteamUserGameDetails(appId);
      return data;
    },
  });

  return [data, isLoading, error];
};
