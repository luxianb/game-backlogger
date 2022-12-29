import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../apis/user.apis";

const KEY = "STEAM_ID";

export const useSteamId = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: async () => {
      const data = await getUserProfile();
      if (data?.steamId) return data?.steamId;
      return null;
    },
  });

  return [data, { isLoading, error }];
};
