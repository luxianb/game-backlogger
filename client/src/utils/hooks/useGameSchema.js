import { useQuery } from "@tanstack/react-query";
import { getSchemaForGame } from "../apis/steam.apis";

const KEY = "GAME_SCHEMA";

export const useGameSchema = (appid) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, appid],
    queryFn: () => getSchemaForGame(appid),
  });

  return [data, { isLoading, error }];
};
