import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { getUserProfile } from "../apis/user.apis";

export const useSteamId = () => {
  const authToken = useStore((state) => state.access_token);
  const [steamId, setSteamId] = useState(null);
  useEffect(() => {
    if (authToken) {
      fetchUserProfile(authToken);
    } else {
      setSteamId(null);
    }
  }, [authToken]);

  const fetchUserProfile = async (token) => {
    const data = await getUserProfile(token);
    if (data?.steamId) setSteamId(data?.steamId);
  };

  return steamId;
};
