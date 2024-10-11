import React from "react";
import { data } from "./data";
import PlayerPic from "./PlayerPic";

const LineUp = ({
  style,
  pos,
  team,
  setTeam,
  positions,
  setPositions,
  setShowSearch,
  showSearch,
  setClickedPlayer,
  switchMode,
  setSwitchMode,
  setClickedPlayerData,
  customFormation,
  setCustomFormation,
  setCustomPositions,
  customPositions,
}) => {
  return (
    <div
      className={`${
        customFormation === "fixed" ? style : ""
      } absolute cursor-pointer cont z-20`}
      style={
        customFormation === "custom"
          ? {
              left: `${customPositions[pos].left}px`,
              top: `${customPositions[pos].top}px`,
            }
          : {}
      }
    >
      {team
        .filter((p) => p.idx == pos)
        .map((p) => (
          <PlayerPic
            p={p}
            pos={pos}
            data={data}
            key={p.id}
            team={team}
            setTeam={setTeam}
            positions={positions}
            setPositions={setPositions}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            setClickedPlayer={setClickedPlayer}
            setSwitchMode={setSwitchMode}
            switchMode={switchMode}
            setClickedPlayerData={setClickedPlayerData}
            customFormation={customFormation}
            setCustomFormation={setCustomFormation}
            setCustomPositions={setCustomPositions}
            customPositions={customPositions}
          />
        ))}
    </div>
  );
};

export default LineUp;
