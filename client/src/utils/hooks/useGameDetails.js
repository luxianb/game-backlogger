import { useQuery } from "@tanstack/react-query";
import { fetchMultipleGameDetails } from "../apis/steam.apis";

const KEY = "GAME_DETAILS";

export const useGameDetails = (appIds = []) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, { appIds }],
    queryFn: async () => {
      if (!appIds) return {};
      const data = await fetchMultipleGameDetails(appIds);
      return data;
    },
  });

  return [data, { isLoading, error }];
};
