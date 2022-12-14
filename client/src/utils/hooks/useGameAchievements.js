import { useQuery } from "@tanstack/react-query";
import { fetchSteamGameAchievements } from "../apis/steam.apis";
import { useGameSchema } from "./useGameSchema";

const KEY = "GAME_ACHIEVEMENT";

export const useGameAchievements = (appid) => {
  //prettier-ignore
  const [schema, { isLoading: isLoadingSchema, error: schemaError }] = useGameSchema(appid);

  const {
    data: achievements,
    isLoading,
    error,
  } = useQuery({
    queryKey: [KEY, appid],
    queryFn: () => {
      if (!appid) return [];
      return fetchSteamGameAchievements(appid);
    },
  });

  const populateAchievement = (achievements, schema) => {
    if (!achievements?.length || !achievements) return [];

    return achievements?.map((item) => {
      const achievementSchema = schema?.availableGameStats?.achievements;
      const schemaInfo = achievementSchema.find((e) => e.name === item.apiname);

      const { hidden, icon, icongray, defaultvalue } = schemaInfo;
      return { ...item, hidden, icon, icongray, defaultvalue };
    });
  };

  const data =
    !isLoading && !isLoadingSchema && !error && !schemaError
      ? populateAchievement(achievements, schema)
      : [];

  return [data, { isLoading, error }];
};
