export interface FavAchievement {
  id?: number;
  appid: number;
  gamename?: string;
  apiname: string;
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
  appid: number;
  name: string;
  pos: number;
  user_id: number;
}
