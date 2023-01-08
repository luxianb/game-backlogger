const getImage = (appId, imgName) => {
  if (!appId) return null;
  let baseurl = "https://steamcdn-a.akamaihd.net/steam/apps/";
  baseurl += `${appId}/`;
  baseurl += `${imgName}`;
  return baseurl;
};

const getGameHeader = (appId) => {
  return getImage(appId, "header.jpg");
};
const getGameLogo = (appId) => {
  return getImage(appId, "logo.png");
};
const getGameHeroBanner = (appId) => {
  return getImage(appId, "library_hero.jpg");
};
const getGameBoxart = (appId) => {
  return getImage(appId, "library_600x900.jpg");
};
const getGameBackground = (appId) => {
  return getImage(appId, "page_bg_generated_v6b.jpg");
};
const getGameHeroCapsule = (appId) => {
  return getImage(appId, "hero_capsule.jpg");
};
const getGamePortrait = (appId) => {
  return getImage(appId, "portrait.png");
};
const getGameCapsuleMedium = (appId) => {
  return getImage(appId, "capsule_616x353.jpg");
};
const getGameCapsuleSmall = (appId) => {
  return getImage(appId, "capsule_231x87.jpg");
};

module.exports = {
  getGameBackground,
  getGameBoxart,
  getGameCapsuleMedium,
  getGameCapsuleSmall,
  getGameHeader,
  getGameHeroBanner,
  getGameHeroCapsule,
  getGameLogo,
  getGamePortrait,
};
