export interface FavAchievement {
  id?: number;
  gameid: number;
  gamename?: string;
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

export interface FavAchievementGameList {
  id?: number;
  gameid: number;
  name: string;
  pos: number;
  user_id: number;
}
