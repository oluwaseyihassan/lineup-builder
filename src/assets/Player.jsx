import React from "react";
import { data } from "../data";
import PlayerIconSvg from "./PlayerIconSvg";
import { imgPlaceholder } from "./assets";

const Player = ({
  style,
  pos,
  customTeam,
  setCustomTeam,
  positions,
  setPositions,
  setShowSearch,
  clickedPlayer,
  setClickedPlayer,
  switchMode,
  setSwitchMode,
  c,
}) => {
  const handleClick = (e) => {
    setShowSearch(true);
    console.log(e.target.dataset.pos);
    setClickedPlayer(e.target.dataset.pos);
    setSwitchMode("custom");
    console.log(switchMode);

    // customTeam.map((c) => {
    //     if (e.target.dataset.pos == c.idx) {
    //         c['name'] = 'paragon'
    //         console.log(customTeam);

    //     console.log(c);
    //     }

    // })
  };
  const handleDragStart = (e, index) => {
    console.log("drag start");
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
    // const tempPosition = newPositions[data1]?.replace(
    //   "transition-all duration-500",
    //   ""
    // );
    // newPositions[data1] = newPositions[data2]?.replace(
    //   "transition-all duration-500",
    //   ""
    // );
    // newPositions[data2] = tempPosition;

    setPositions({
      ...positions,
      [data1]: positions[data2]?.replace("transition-all duration-500", ""),
      [data2]: positions[data1]?.replace("transition-all duration-500", ""),
    });
    console.log(positions);
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-30");
  };

  const handleDragEnter = (e) => {
    e.target.classList.add("opacity-30");
  };
  return (
    <div className={`${style} absolute cursor-pointer cont z-20`}>
      <div
        className={` transition-opacity duration-200 after:bg-transparent after:h-full after:w-full after:absolute after:top-0 hover:opacity-70 z-20 flex items-center flex-col gap-1`}
        onClick={handleClick}
        draggable={true}
        data-pos={pos}
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
      >
        {c.id ? (
          <>
            <div className=" h-[32px] sm:h-[40px] sm:w-[40px] w-[32px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden">
              <img
                src={`https://images.fotmob.com/image_resources/playerimages/${c.id}.png`}
                onError={(e) => (e.target.src = imgPlaceholder)}
                alt=""
                className=" h-7 sm:h-9  bottom-0"
              />
            </div>
            <div className=" text-[12px] text-center text-white">
              {c.name.split(" ")[c.name.split(" ").length - 1]}
            </div>
          </>
        ) : (
          <>
            {/* <PlayerIconSvg /> */}
            <div className=" h-[40px] w-[40px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden">
              <img src={imgPlaceholder} alt="" className=" h-9 w-9 bottom-0" />
            </div>
            <div className=" text-[12px] text-center text-[#1D1D11D] bg-white rounded-full h-3 w-3 flex justify-center items-center">
              +
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
