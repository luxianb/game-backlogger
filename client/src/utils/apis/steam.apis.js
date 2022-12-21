import axios from "axios";

export const fetchSteamProfile = (steamId) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("🚀  steamId", steamId);
      const data = await axios
        .get(`/api/steam/profile/${steamId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamUserGamelist = (steamId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/profile/${steamId}/gamelist`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchRecentSteamGames = (steamId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/profile/${steamId}/recent`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamGameStat = (steamId, appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/profile/${steamId}/stat/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamFriends = (steamId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/profile/${steamId}/friends`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamGameGlobalAchievement = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/game/achievement/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamGameNews = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/game/news/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export const fetchSteamGameInfo = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/game/info/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchAllSteamGames = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get(`/api/steam/game/list`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
