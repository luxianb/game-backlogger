import { useFavAchievements } from "../utils/hooks";
import { Page, Row } from "../components/common";
import { groupAchievementsByAppid } from "./Achievements.helpers";
import { AchievementDisplayList } from "../components/achievements/AchievementDisplayList";

export const AchievementsPage = () => {
  const [favAchievements] = useFavAchievements();
  const groupedAchievements = groupAchievementsByAppid(favAchievements);
  console.log("🚀  groupedAchievements", groupedAchievements);

  return (
    <Page style={{ margin: "1rem", marginLeft: 0 }}>
      <h2>Achievement Watchlist</h2>
      <Row>
        {Object.keys(groupedAchievements).map((appid) => (
          <AchievementDisplayList
            key={appid}
            appid={appid}
            achievements={groupedAchievements[appid]}
          />
        ))}
      </Row>
    </Page>
  );
};
