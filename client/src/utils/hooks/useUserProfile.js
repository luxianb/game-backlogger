import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/user.apis";

export const useUserProfile = () => {
  // const authToken = useStore((state) => state.access_token);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const data = await getUserProfile();
    console.log("🚀  data", data);
    setProfile(data);
  };

  return [profile, setProfile];
};
