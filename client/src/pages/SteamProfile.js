import { useEffect, useState } from "react";
import SteamButton from "../assets/steam_button_1.png";
import axios from "axios";

const SteamProfilePage = () => {
  const [steamData, setSteamData] = useState(null);

  useEffect(() => {
    fetchSteamProfileFromSession();
  }, []);

  async function fetchSteamProfileFromSession() {
    const data = await axios.get("api/sessions/steam").then((res) => res.data);
    if (data) setSteamData(data);
  }

  async function loginToSteam() {
    const link = window.location.href;
    const data = await axios
      .post("api/steam/return", { link })
      .then((res) => res.data);
    if (!data.success) return;
    window.location.href = "http://localhost:3001/api/auth/steam";
  }

  if (steamData) console.log(steamData);

  const renderSteamInfo = () => {
    if (!steamData) return;

    return (
      <div>
        {steamData?.photos && (
          <img src={steamData?.photos[2]?.value} alt="profile" />
        )}
        <p>{steamData.displayName}</p>
        <p>{steamData.id}</p>
      </div>
    );
  };

  return (
    <div>
      <img src={SteamButton} alt="steam-button" onClick={loginToSteam} />
      {renderSteamInfo()}
    </div>
  );
};

export default SteamProfilePage;
