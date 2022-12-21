import axios from "axios";

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
