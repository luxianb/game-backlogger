import { useQuery } from "@tanstack/react-query";
import { fetchSteamProfile } from "../apis/steam.apis";

const KEY = "STEAM_PROFILE";

export const useSteamProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: fetchSteamProfile,
  });

  return [data, { isLoading, error }];
};
