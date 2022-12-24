import { useQuery } from "@tanstack/react-query";
import { async } from "q";
import {
  fetchSteamGameAchievements,
  getSchemaForGame,
} from "../apis/steam.apis";

const KEY = "GAME_ACHIEVEMENT";
const SCHEMA_KEY = "GAME_SCHEMA";

export const useGameAchievements = (steamid, appid) => {
  const {
    data: achievements,
    isLoading,
    error,
  } = useQuery({
    queryKey: [KEY, appid],
    queryFn: () => {
      console.log("🚀  appid", appid);
      console.log("🚀  steamid", steamid);
      if (!steamid || !appid) return [];
      return fetchSteamGameAchievements(steamid, appid);
    },
  });
  const {
    data: schema,
    isLoading: isLoadingSchema,
    error: schemaError,
  } = useQuery({
    queryKey: [SCHEMA_KEY, appid],
    queryFn: () => getSchemaForGame(appid),
  });

  const populateAchievement = (achievements, schema) => {
    return achievements.map((item) => {
      const schemaInfo = schema.availableGameStats.achievements.find(
        (e) => e.name === item.apiname
      );
      const { hidden, icon, icongray, defaultvalue } = schemaInfo;
      return { ...item, hidden, icon, icongray, defaultvalue };
    });
  };

  const data =
    !isLoading && !isLoadingSchema
      ? populateAchievement(achievements, schema)
      : [];

  return [data, { isLoading, error }];
};
