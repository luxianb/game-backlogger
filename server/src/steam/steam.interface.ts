export interface getAppListParams {
  key?: string;
  if_modified_since?: number;
  have_description_language?: string;
  include_games?: boolean;
  include_dlc?: boolean;
  include_software?: boolean;
  include_videos?: boolean;
  include_hardware?: boolean;
  last_appid?: number;
  max_results?: number | 10000 | 50000;
}
export interface getGlobalStatsForGameParams {
  appid: string;
  count: number;
  name: string[];
  enddate?: number;
  startdate?: number;
}
export interface getOwnedGamesParams {
  key?: string;
  steamid: string;
  include_appinfo: boolean;
  include_played_free_games: boolean;
  appids_filter: Array<string>;
}
export interface getNewsForAppParams {
  appid: string;
  maxlength?: number;
  enddate?: number;
  count?: number;
  feeds?: string[];
}
