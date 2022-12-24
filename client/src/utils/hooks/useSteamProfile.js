import { useQuery } from "@tanstack/react-query";
import { fetchSteamProfile } from "../apis/steam.apis";

const KEY = "STEAM_PROFILE";

export const useSteamProfile = (steamId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, steamId],
    queryFn: () => fetchSteamProfile(steamId),
  });

  return [data, { isLoading, error }];
};
