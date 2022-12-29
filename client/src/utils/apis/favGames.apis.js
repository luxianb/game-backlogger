import axios from "axios";

export const getFavGames = (appId) =>
  new Promise(async (resolve, reject) => {
    try {
      let url = "/api/favGames";
      if (appId) url += `/${appId}`;

      const data = await axios.get(url).then((res) => res.data);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const toggleGameFav = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .post("/api/favGames", body)
        .then((res) => res.data);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
