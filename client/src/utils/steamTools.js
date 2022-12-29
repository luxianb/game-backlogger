import axios from "axios";
// import { checkUrl } from "./tools";

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

const getImage = (appId, imgName) => {
  if (!appId) return null;
  let baseurl = "https://steamcdn-a.akamaihd.net/steam/apps/";
  baseurl += `${appId}/`;
  baseurl += `${imgName}`;
  return baseurl;
};

export const getGameHeader = (appId) => {
  return getImage(appId, "header.jpg");
};
export const getGameLogo = (appId) => {
  return getImage(appId, "logo.png");
};
export const getGameHeroBanner = (appId) => {
  return getImage(appId, "library_hero.jpg");
};
export const getGameBoxart = (appId) => {
  return getImage(appId, "library_600x900.jpg");
};
export const getGameBackground = (appId) => {
  return getImage(appId, "page_bg_generated_v6b.jpg");
};
export const getGameHeroCapsule = (appId) => {
  return getImage(appId, "hero_capsule.jpg");
};
export const getGamePortrait = (appId) => {
  return getImage(appId, "portrait.png");
};
export const getGameCapsuleMedium = (appId) => {
  return getImage(appId, "capsule_616x353.jpg");
};
export const getGameCapsuleSmall = (appId) => {
  return getImage(appId, "capsule_231x87.jpg");
};
// export const getGameBackground = (appId) => {
//   const url = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/page_bg_generated.jpg`;
//   const valid = checkUrl(url);
//   return valid ? url : null;
// };
