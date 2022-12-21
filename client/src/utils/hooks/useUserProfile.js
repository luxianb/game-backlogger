import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { getUserProfile } from "../apis/user.apis";

export const useUserProfile = () => {
  const authToken = useStore((state) => state.access_token);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (authToken) {
      fetchUserProfile(authToken);
    } else {
      setProfile(null);
    }
  }, [authToken]);

  const fetchUserProfile = async (token) => {
    const data = await getUserProfile(token);
    setProfile(data);
  };

  return [profile, setProfile];
};
