import axios from "axios";

export const toggleAchievementFav = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .post("/api/favAchievements", body)
        .then((res) => res.data);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const getFavAchievements = (appid) =>
  new Promise(async (resolve, reject) => {
    try {
      let url = "/api/favAchievements";
      if (appid) url += `/${appid}`;
      const data = await axios.get(url).then((res) => res.data);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
