import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFavAchievements,
  toggleAchievementFav,
} from "../apis/favAchievement.apis";
import { v4 as uuidv4 } from "uuid";
// import { useParams } from "react-router-dom";

const KEY = "FAV_ACHIEVEMENT";

export const useFavAchievements = (appid) => {
  const queryKey = [KEY];
  if (appid) queryKey.push(appid);
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getFavAchievements(appid),
  });

  return [data, { isLoading, error }];
};

export const useToggleFavAchievement = (appid) => {
  // const { appid } = useParams();
  const queryKey = [KEY];
  if (appid) queryKey.push(appid);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleAchievementFav,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      // Create optimistic todo
      const optimisticData = { id: uuidv4(), ...variables };
      // Add optimistic todo to todos list
      queryClient.setQueryData(queryKey, (old) => {
        const achievementExists = old.find(
          (item) =>
            item.appid === variables.appid && item.apiname === variables.apiname
        );
        if (achievementExists) {
          return old.filter((item) => item.apiname !== variables.apiname);
        } else {
          return [...old, optimisticData];
        }
      });

      // Return context with the optimistic todo
      return { optimisticData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, (old) =>
        old.filter((item) => item.id !== context.optimisticData.id)
      );
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(queryKey, (old) =>
        old.map((item) =>
          item.id === context.optimisticData.id ? result : item
        )
      );
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
    retry: 3,
  });
};
