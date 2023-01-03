import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import {
  getFavAchievementsGameLists,
  toggleAchievementFav,
} from "../apis/favAchievement.apis";

const KEY = "FAV_ACHIEVEMENT";

export const useFavAchievementLists = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [KEY],
    queryFn: () => getFavAchievementsGameLists(),
  });

  const processData = () => {
    if (isLoading || error) return [];
    return data
      .sort((a, b) => {
        if (a?.pos > b?.pos) return 1;
        if (a?.pos < b?.pos) return -1;
        return 0;
      })
      .map((data, index) => ({ ...data, pos: data?.pos ?? index }));
  };

  return [processData(), { isLoading, error }];
};

export const useToggleFavAchievementListItem = () => {
  const queryKey = [KEY];

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleAchievementFav,
    onMutate: handleMutate,
    onError: handleError,
    onSuccess: handleSuccess,
    onSettled: handleSettled,
    retry: 3,
  });

  async function handleMutate(variables) {
    await queryClient.cancelQueries({ queryKey });
    const optimisticData = { id: uuidv4(), ...variables };

    const savedList = [...queryClient.getQueryData(queryKey)];
    const prev = [...queryClient.getQueryData(queryKey)];
    const index = prev.findIndex(({ appid }) => appid === variables.appid);

    const achievementExists =
      index !== -1 &&
      prev[index]?.achievements?.some(
        ({ apiname }) => apiname === variables.apiname
      );

    if (achievementExists) {
      const modifiedList = prev[index].achievements?.filter(
        ({ apiname }) => apiname !== variables.apiname
      );
      if (modifiedList.length) {
        prev.splice(index, 1, { ...prev[index], achievements: modifiedList });
      } else {
        prev.splice(index, 1);
      }
    } else {
      const modifiedList = prev[index].achievements?.push(optimisticData);
      prev.splice(index, 1, { ...prev[index], achievements: modifiedList });
    }

    queryClient.setQueryData(queryKey, prev);

    return { optimisticData, savedList };
  }
  function handleError(error, variables, context) {
    // const prev = [...queryClient.getQueryData(queryKey)];
    // const index = prev.findIndex(
    //   ({ appid }) => appid === context.optimisticData.appid
    // );
    // const modifiedList = prev[index].achievements?.filter(
    //   ({ id }) => id !== context.optimisticData.id
    // );
    // prev.splice(index, 1, { ...prev[index], achievements: modifiedList });

    queryClient.setQueryData(queryKey, context.savedList);
  }
  function handleSuccess(result, variables, context) {
    const prev = [...queryClient.getQueryData(queryKey)];
    const index = prev.findIndex(
      ({ appid }) => appid === context.optimisticData.appid
    );
    if (index !== -1) {
      const modifiedList = prev[index].achievements?.map((item) =>
        item.id === context.optimisticData.id ? result : item
      );
      prev.splice(index, 1, { ...prev[index], achievements: modifiedList });
      queryClient.setQueryData(queryKey, prev);
    }
  }
  function handleSettled(data, error, variables, context) {}
};
