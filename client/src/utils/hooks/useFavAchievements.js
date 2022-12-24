import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getFavAchievements,
  toggleAchievementFav,
} from "../apis/favAchievement.apis";

const KEY = "FAV_ACHIEVEMENT";

// export const useFavAchievements = (appid) => {
//   const [achievements, setAchievements] = useState([]);

//   useEffect(() => {
//     fetchAchievements(appid);
//   }, [appid]);

//   const fetchAchievements = async (appid) => {
//     const data = await getFavAchievements(appid);
//     setAchievements(data);
//   };

//   return achievements;
// };

export const useFavAchievements = (appid) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY, appid],
    queryFn: () => getFavAchievements(appid),
  });

  return [data, { isLoading, error }];
};

export const useToggleFavAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleAchievementFav,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [KEY] });
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      // return { id: 1 };
    },
    onError: (error, variables, context) => {
      // An error happened!
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries({ queryKey: [KEY] });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
};
