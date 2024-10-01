import React from "react";
import { data } from "./data";
import PlayerPic from "./PlayerPic";

const LineUp = ({
  style,
  pos,
  team,
  positions,
  setPositions,
  setShowSearch,
  showSearch,
  setClickedPlayer,
  switchMode,
  setSwitchMode,
  setClickedPlayerData
}) => {
  return (
    <div className={`${style} absolute cursor-pointer cont z-20`}>
      {team
        .filter((p) => p.idx == pos)
        .map((p) => (
          <PlayerPic
            p={p}
            pos={pos}
            data={data}
            key={p.id}
            team={team}
            positions={positions}
            setPositions={setPositions}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            setClickedPlayer={setClickedPlayer}
            setSwitchMode={setSwitchMode}
            switchMode={switchMode}
            setClickedPlayerData={setClickedPlayerData}
          />
        ))}
    </div>
  );
};

export default LineUp;
