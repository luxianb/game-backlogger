import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { getFavGames, toggleGameFav } from "../apis/favGames.apis";

const KEY = "FAV_GAME";

const getQueryKey = (appid) => {
  const queryKey = [KEY];
  if (appid) queryKey.push(appid);
  return queryKey;
};

export const useFavGames = (appid) => {
  const queryKey = getQueryKey(appid);
  const { data, error, isLoading } = useQuery({
    queryKey,
    queryFn: () => getFavGames(appid),
  });

  return [data, { error, isLoading }];
};

export const useToggleFavGames = (appid) => {
  const queryKey = getQueryKey(appid);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleGameFav,
    onMutate: handleOnMutate,
    onError: handleOnError,
    onSuccess: handleOnSuccess,
    onSettled: handleOnSettled,
  });

  async function handleOnMutate(variables) {
    let optimisticData;
    await queryClient.cancelQueries({ queryKey });

    if (appid) {
      optimisticData = !queryClient.getQueryData(queryKey) ?? true;
      queryClient.setQueryData(queryKey, () => optimisticData);
    } else {
      optimisticData = { id: uuidv4(), ...variables };
      queryClient.setQueryData(queryKey, (old) => {
        const gameExists = old.find((game) => game.appid === variables.appid);
        if (gameExists) {
          return old.filter((item) => item.appid !== variables.appid);
        } else {
          return [...old, optimisticData];
        }
      });
    }
    return { optimisticData };
  }

  async function handleOnError(error, variables, context) {
    if (appid) {
      queryClient.setQueryData(queryKey, (old) => !context.optimisticData);
    } else {
      queryClient.setQueryData(queryKey, (old) =>
        old.filter((item) => item.id !== context.optimisticData.id)
      );
    }
  }
  async function handleOnSuccess(result, variables, context) {
    if (appid) return;

    queryClient.setQueryData(queryKey, (old) =>
      old.map((item) => (item.id === context.optimisticData.id ? result : item))
    );
  }

  async function handleOnSettled(data, error, variables, context) {}
};
