import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/user.apis";

export const useSteamId = () => {
  const [steamId, setSteamId] = useState(null);
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const data = await getUserProfile();
    console.log("🚀  data", data);
    if (data?.steamId) setSteamId(data?.steamId);
  };

  return steamId;
};
