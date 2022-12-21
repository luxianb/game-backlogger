import { useParams } from "react-router-dom";
import { Page } from "../../components/common";
import Navbar from "../../layouts/navbar/Navbar";
import { useGameData } from "../../utils/hooks";

export const GameDetailsPage = () => {
  const params = useParams();
  const [gameData] = useGameData(params?.appid);

  return (
    <Page>
      <Navbar />
      {gameData?.name && <h2>{gameData?.name}</h2>}
      {gameData?.header_image && (
        <img src={gameData?.header_image} width={500} alt="banner" />
      )}
    </Page>
  );
};
