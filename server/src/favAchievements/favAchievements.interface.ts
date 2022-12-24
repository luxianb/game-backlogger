export interface FavAchievement {
  id?: number;
  gameid: string;
  achievementid: string;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
  user_id?: number;
  favourited?: boolean;
  createdAt: string;
  updatedAt: string;
}
