import { instance } from "./api.tools";

export const fetchSteamProfile = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamUserGamelist = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/gamelist`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamUserGameDetails = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/gamelist/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchMultipleGameDetails = (appids_filter) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .post(`/api/steam/profile/gamelist`, { appids_filter })
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchRecentSteamGames = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/recent`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamGameAchievements = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/achievements/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const getSchemaForGame = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/game/${appId}/schema`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamGameStat = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/stat/${appId}`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
export const fetchSteamFriends = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/api/steam/profile/friends`)
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
      const data = await instance
        .get(`/api/steam/game/${appId}/achievement`)
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
      const data = await instance
        .get(`/api/steam/game/${appId}/news`)
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
      const data = await instance
        .get(`/api/steam/game/${appId}/info`)
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
      const data = await instance
        .get(`/api/steam/store/game`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
