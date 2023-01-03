import { useFavGames } from "./useFavGames";
import { useGameDetails } from "./useGameDetails";

export const useDetailedFavGames = () => {
  const [favGame, favGameState] = useFavGames();
  const ids = favGame?.map((item) => item.appid);

  const [details, detailsState] = useGameDetails(ids);

  const populateGameDetails = () => {
    if (
      favGameState.isLoading ||
      detailsState.isLoading ||
      favGameState.error ||
      detailsState.error
    )
      return undefined;

    return favGame
      .sort((a, b) => {
        if (a?.pos < b?.pos) return 1;
        if (a?.pos > b?.pos) return -1;
        return 0;
      })
      .map((game, index) => {
        const gameDetail = details?.games.find(
          (item) => item.appid === game.appid
        );

        return { ...gameDetail, ...game, pos: game?.pos ?? index };
      });
  };

  return [
    populateGameDetails(),
    {
      isLoading: favGameState.isLoading || detailsState.isLoading,
      error: favGameState.error || detailsState.error,
    },
  ];
};
