import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../apis/user.apis";

const KEY = "USER_PROFILE";

export const useUserProfile = (steamId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, steamId],
    queryFn: () => getUserProfile(),
  });

  return [data, { isLoading, error }];
};
