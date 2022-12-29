export const groupAchievementsByAppid = (achievements) => {
  if (!Array.isArray(achievements)) return {};

  return achievements.reduce((prev, curr) => {
    const { gameid } = curr;
    if (!prev[gameid]) prev[gameid] = [];
    prev[gameid].push(curr);
    return prev;
  }, {});
};
