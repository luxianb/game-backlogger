export const groupAchievementsByAppid = (achievements) => {
  if (!Array.isArray(achievements)) return {};

  return achievements.reduce((prev, curr) => {
    const { appid } = curr;
    if (!prev[appid]) prev[appid] = [];
    prev[appid].push(curr);
    return prev;
  }, {});
};
