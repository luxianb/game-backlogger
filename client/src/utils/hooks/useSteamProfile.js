import { useEffect, useState } from "react";
import { fetchSteamProfile } from "../apis/steam.apis";

export const useSteamProfile = (steamId) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    if (steamId) {
      getUserSteamProfile(steamId);
    } else {
      setProfile([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steamId]);

  const getUserSteamProfile = async (steamId) => {
    const data = await fetchSteamProfile(steamId);
    console.log("🚀  data", data);
    setProfile(data);
  };

  return [profile, setProfile];
};
