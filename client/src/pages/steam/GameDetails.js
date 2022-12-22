import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Page, Row } from "../../components/common";
import Navbar from "../../layouts/navbar/Navbar";
import { useGameData, useSteamId } from "../../utils/hooks";
import { useGameAchievements } from "../../utils/hooks/useGameAchievements";
import {
  getGameBoxart,
  getGameHeroBanner,
  getGameImageAssets,
} from "../../utils/steamTools";

export const GameDetailsPage = () => {
  const params = useParams();
  const [game] = useGameData(params?.appid);
  const steamId = useSteamId();
  const [achievements] = useGameAchievements(steamId, params?.appid);
  const containerRef = useRef();
  const [containerHeight, setContainerHeight] = useState(null);
  // console.log("🚀  achievement", achievements);
  console.log("🚀  gameData", game);

  useEffect(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.clientHeight.toFixed(2) * 0.75;
    console.log("🚀  height", height);
    if (containerHeight !== height) setContainerHeight(height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef?.current?.clientHeight]);

  const renderAchievements = () => {
    if (!achievements.length) return null;

    const renderList = () =>
      achievements.map((item) => (
        <Row key={item.apiname}>
          <img
            alt="achievement-icon"
            src={item?.achieved ? item?.icon : item?.icongray}
          />
          <Col>
            <p>{item?.name}</p>
            <p>{item?.description}</p>
            {Boolean(item?.achieved) && (
              <p>
                Unlocked:{" "}
                {dayjs.unix(item?.unlocktime).format("D MMM 'YY, h:mmA")}
              </p>
            )}
          </Col>
        </Row>
      ));

    return <Col>{renderList()}</Col>;
  };

  return (
    <Page>
      <Navbar />

      <img
        src={getGameHeroBanner(params?.appid) || game?.background}
        alt="hero-banner"
        style={{ filter: `brightness(.3)` }}
      />
      <Row
        style={{
          transform: `translateY(-75%)`,
          gap: "1rem",
          marginBottom: -containerHeight || "unset",
          padding: "0 1rem",
        }}
        ref={containerRef}
      >
        <img
          src={getGameBoxart(params?.appid)}
          alt="box-art"
          width={250}
          style={{
            boxShadow: `0 0 6px rgba(0,0,0,.1)`,
            position: "relative",
            borderRadius: 8,
          }}
        />
        <Col style={{ gap: ".5rem" }}>
          {game?.name && <h1 style={{ color: "white" }}>{game?.name}</h1>}
          <div
            style={{ color: "white", marginRight: "1rem" }}
            dangerouslySetInnerHTML={{ __html: game?.short_description }}
          />
        </Col>
      </Row>
      {game?.header_image && (
        <img src={game?.header_image} width={500} alt="banner" />
      )}
      {/* <div dangerouslySetInnerHTML={{ __html: game?.detailed_description }} /> */}

      <h3>{`Achievements (${
        achievements.filter((item) => item.achieved).length
      }/${achievements.length})`}</h3>
      {renderAchievements()}
    </Page>
  );
};
