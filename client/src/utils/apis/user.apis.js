import axios from "axios";

export const createUser = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios.post("/api/users", body).then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const authUser = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .post("/api/auth/login", body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const getUserProfile = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.data);
      resolve(data);
      return data;
    } catch (err) {
      reject(err);
    }
  });

export const createSteamProfile = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios.post("/api/steam", body).then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const updateUser = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await axios
        .put(`/api/users/${id}`, body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
