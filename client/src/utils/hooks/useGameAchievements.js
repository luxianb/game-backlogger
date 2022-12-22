import { useEffect, useState } from "react";
import {
  fetchSteamGameAchievements,
  getSchemaForGame,
} from "../apis/steam.apis";

export const useGameAchievements = (steamid, appid) => {
  const [achievements, setAchievements] = useState([]);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    if (appid) {
      getSchema(appid);
    } else {
      setSchema(null);
    }
  }, [appid]);

  useEffect(() => {
    if (steamid && appid) {
      getAchievements(steamid, appid);
    } else {
      setAchievements([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steamid, appid, schema]);

  const getSchema = async (appid) => {
    const data = await getSchemaForGame(appid);
    setSchema(data);
  };

  const getAchievements = async (steamid, appid) => {
    let data = await fetchSteamGameAchievements(steamid, appid);
    if (schema) {
      data = populateAchievement(data);
      setAchievements(data);
    }
  };

  const populateAchievement = (achievements) => {
    return achievements.map((item) => {
      const schemaInfo = schema.availableGameStats.achievements.find(
        (e) => e.name === item.apiname
      );
      const { hidden, icon, icongray, defaultvalue } = schemaInfo;
      return { ...item, hidden, icon, icongray, defaultvalue };
    });
  };

  return [achievements, setAchievements];
};
