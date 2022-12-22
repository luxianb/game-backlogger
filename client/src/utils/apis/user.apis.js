import { instance } from "./api.tools";

export const createUser = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .post("/api/users", body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const authUser = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .post("/api/auth/login", body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const logoutUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .post("/api/auth/logout")
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const getUserProfile = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance.get("/api/profile").then((res) => res.data);
      resolve(data);
      return data;
    } catch (err) {
      reject(err);
    }
  });

export const createSteamProfile = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .post("/api/steam", body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });

export const updateUser = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await instance
        .put(`/api/users/${id}`, body)
        .then((res) => res.data);
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
