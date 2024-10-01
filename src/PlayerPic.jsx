import React, { useEffect, useState } from "react";
import { imgPlaceholder } from "./assets/assets";

const PlayerPic = ({
  p,
  pos,
  data,
  team,
  positions,
  setPositions,
  setShowSearch,
  showSearch,
  setClickedPlayer,
  switchMode,
  setSwitchMode,
  setClickedPlayerData,
}) => {
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("pos", e.target.dataset.pos);
  };
  const handleDrag = () => {};

  const handleDragLeave = (e) => {
    e.target.classList.remove("opacity-30");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e, index) => {
    e.preventDefault();

    const newPositions = { ...positions };
    const data1 = e.dataTransfer.getData("pos");
    const data2 = e.target.dataset.pos;

    setPositions({
      ...positions,
      [data1]: positions[data2]?.replace("transition-all duration-500", ""),
      [data2]: positions[data1]?.replace("transition-all duration-500", ""),
    });
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-30");
  };

  const handleDragEnter = (e) => {
    e.target.classList.add("opacity-30");
  };
  const handleClick = (e) => {
    setShowSearch(true);
    setClickedPlayer(e.target.dataset.pos);
    setClickedPlayerData(team[pos]);
    setSwitchMode("fetched");
  };

  return (
    <button
      data-pos={pos}
      draggable={true}
      onClick={handleClick}
      onDragStart={(e) => {
        handleDragStart(e, pos);
        e.target.classList.add("opacity-30");
      }}
      onDrop={(e) => {
        handleDrop(e, pos);
        e.target.classList.remove("opacity-30");
      }}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDrag={handleDrag}
      //   onMouseOver={handleMouseOver}
      className={` transition-opacity gap-1  duration-200 after:bg-transparent after:h-full after:w-full after:absolute after:top-0 flex flex-col items-center focus:opacity-30 hover:opacity-30 outline-none justify-center`}
    >
      <div className=" h-[32px] sm:h-[40px] sm:w-[40px] w-[32px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden">
        <img
          src={`https://images.fotmob.com/image_resources/playerimages/${p.id}.png`}
          onError={(e) => (e.target.src = imgPlaceholder)}
          alt=""
          className=" h-7 sm:h-9  bottom-0"
          data-pos={pos}
          draggable={false}
        />
      </div>
      <div
        className={`text-[12px] text-center text-white has-tooltip z-50 max-w-[50px] flex justify-center flex-wrap`}
        data-pos={pos}
      >
        {p.name.split(" ")[p.name.split(" ").length - 1]}
        {/* <span className="tooltip text-[12px] w-[50px] text-center bg-[#1D1D1D] outline outline-1 outline-[white] text-white mt-2 px-1 z-50">
            {p.name}
          </span> */}
      </div>
    </button>
  );
};

export default PlayerPic;
