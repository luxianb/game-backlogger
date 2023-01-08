const { default: axios } = require("axios");

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL ?? "http://localhost:3001/api/steam",
});

const fetchApplicationIds = (params, type = "game") =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/store/${type}`, { params })
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

const getSchemaForGame = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/game/${appId}/schema`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

const fetchSteamGameInfo = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .get(`/game/${appId}/info`)
        .then((res) => res.data);
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

module.exports = {
  instance,
  fetchApplicationIds,
  getSchemaForGame,
  fetchSteamGameInfo,
};
