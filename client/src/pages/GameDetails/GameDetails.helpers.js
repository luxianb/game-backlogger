import { HIDE_HIDDEN, SHOW_ALL } from "./GameDetails.contants";

export function getFavourited(achievement, favAchievements) {
  if (!favAchievements) return null;
  return favAchievements.some((e) => e.achievementid === achievement.apiname);
}

export function getFilterFunction(filter) {
  switch (filter) {
    case "completed":
      return (item) => item.achieved;
    case "incompleted":
      return (item) => !item.achieved;
    default:
      return () => true;
  }
}

export function getViewFilterFunction(filter, view) {
  if (filter !== "completed") {
    switch (view) {
      case HIDE_HIDDEN:
        return (item) => !item.hidden;
      case SHOW_ALL:
      default:
        return () => true;
    }
  }
  return () => true;
}

export function getSortingFunction(filter) {
  switch (filter) {
    case "completed":
      return (a, b) => b.unlocktime - a.unlocktime;
    default:
      return (a, b) => 0;
  }
}
