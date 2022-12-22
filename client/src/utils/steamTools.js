import axios from "axios";
import { checkUrl } from "./tools";

export const fetchSteamProfileFromSession = () =>
  new Promise((resolve, reject) =>
    axios
      .get("api/sessions/steam")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  );

export async function navigateToSteamAuth() {
  try {
    const link = window.location.href;
    const data = await axios
      .post("api/steam/return", { link })
      .then((res) => res.data);
    if (!data.success) return;
    window.location.href = "http://localhost:3001/api/auth/steam";
  } catch (err) {
    throw err;
  }
}

export function getGameImageUrl(appid, hash) {
  if (!appid || !hash) return null;
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
}

export function getPlaytime(time) {
  if (!time) return null;

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  let string = "";
  if (hours) string = `${hours}hr `;
  if (minutes) string += `${minutes}mins`;
  return string;
}

export function getUserState(index) {
  switch (index) {
    case 1:
      return "Online";
    case 2:
      return "Busy";
    case 3:
      return "Away";
    case 4:
      return "Snooze";
    case 5:
      return "Looking to trade";
    case 6:
      return "Looking to play";
    case 0:
    default:
      return "Offline";
  }
}

export const getGameHeader = (appId) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`;
  const valid = checkUrl(url);
  return valid ? url : null;
};
export const getGameLogo = (appId) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/logo.png`;
  const valid = checkUrl(url);
  return valid ? url : null;
};
export const getGameHeroBanner = (appId) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_hero.jpg`;
  const valid = checkUrl(url);
  return valid ? url : null;
};
export const getGameBoxart = (appId) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_600x900.jpg`;
  const valid = checkUrl(url);
  return valid ? url : null;
};
export const getGameBackground = (appId) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/page_bg_generated_v6b.jpg`;
  const valid = checkUrl(url);
  return valid ? url : null;
};
// export const getGameBackground = (appId) => {
//   const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/page_bg_generated.jpg`;
//   const valid = checkUrl(url);
//   return valid ? url : null;
// };

export function getGameImageAssets(appId) {
  return {
    header: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`,
    logo: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/logo.png`,
    library_hero: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_hero.jpg`,
    library_boxart: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/library_600x900.jpg`,
    page_bg_generated: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/page_bg_generated.jpg`,
    page_bg_generated_v6b: `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/page_bg_generated_v6b.jpg`,
  };
}
