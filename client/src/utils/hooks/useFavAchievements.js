import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFavAchievements,
  toggleAchievementFav,
} from "../apis/favAchievement.apis";
import { v4 as uuidv4 } from "uuid";

const KEY = "FAV_ACHIEVEMENT";

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

      // Create optimistic todo
      const optimisticData = { id: uuidv4(), ...variables };

      // Add optimistic todo to todos list
      queryClient.setQueryData([KEY, variables.gameid], (old) => {
        const achievementExists = old.find(
          (item) =>
            item.gameid === variables.gameid &&
            item.achievementid === variables.achievementid
        );
        if (achievementExists) {
          return old.filter(
            (item) => item.achievementid !== variables.achievementid
          );
        } else {
          return [...old, optimisticData];
        }
      });

      // Return context with the optimistic todo
      return { optimisticData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([KEY, variables.gameid], (old) =>
        old.filter((item) => item.id !== context.optimisticData.id)
      );
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData([KEY, variables.gameid], (old) =>
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
