import React, { useEffect, useState } from "react";
import { imgPlaceholder } from "./assets/assets";

const PlayerPic = ({
  p,
  pos,
  data,
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
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("pos", e.target.dataset.pos);
    setIsDragging(true);
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

    if (customFormation === "fixed") {
      const newPositions = { ...positions };
      const data1 = e.dataTransfer.getData("pos");
      const data2 = e.target.dataset.pos;
      // setSwitchMode('custom')

      setPositions({
        ...positions,
        [data1]: positions[data2]?.replace("transition-all duration-500", ""),
        [data2]: positions[data1]?.replace("transition-all duration-500", ""),
      });
    }
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-30");

    if (customFormation === "custom") {
      e.preventDefault();
      setIsDragging(false);

      const pos = e.target.dataset.pos;
      console.log(pos);
      const parentWidth = window.getComputedStyle(
        e.target.parentElement.parentElement
      ).width;
      const parentHeight = window.getComputedStyle(
        e.target.parentElement.parentElement
      ).height;
      const differenceBtwElementAndScreenTop =
        e.target.parentElement.parentElement.getBoundingClientRect().top;

      if (
        isDragging &&
        e.clientY <
          differenceBtwElementAndScreenTop +
            +parentHeight.slice(0, parentHeight.indexOf("p")) -
            50 &&
        e.clientY > differenceBtwElementAndScreenTop + 10 &&
        e.clientX >
          (window.innerWidth -
            +parentWidth.slice(0, parentWidth.indexOf("p"))) /
            2 +
            20 &&
        e.clientX <
          (window.innerWidth -
            +parentWidth.slice(0, parentWidth.indexOf("p"))) /
            2 +
            +parentWidth.slice(0, parentWidth.indexOf("p")) -
            40 &&
        pos !== undefined
      ) {
        console.log(
          window.getComputedStyle(e.target.parentElement.parentElement)
        );
        console.log(
          e.clientX,
          e.clientY,
          differenceBtwElementAndScreenTop +
            +parentHeight.slice(0, parentHeight.indexOf("p"))
        );
        // const yDifference = elementTop - scrollTop

        // Calculate new position
        const newLeft =
          e.clientX -
          (window.innerWidth -
            +parentWidth.slice(0, parentWidth.indexOf("p"))) /
            2 -
          10;
        const newTop = e.clientY - differenceBtwElementAndScreenTop - 10;
        const finalLeft =
          (newLeft / +parentWidth.slice(0, parentWidth.indexOf("p"))) * 100;
        const finalTop =
          (newTop / +parentHeight.slice(0, parentHeight.indexOf("p"))) * 100;
        console.log(newTop);

        // Update the positions state with the new coordinates
        setCustomPositions({
          ...customPositions,
          [pos]: { left: finalLeft, top: finalTop },
        });
        console.log(positions[pos]);
      }
    }
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
      {p.id ? (
        <>
          <div className=" h-[32px] sm:h-[52px] sm:w-[52px] w-[32px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden">
            <img
              src={`https://images.fotmob.com/image_resources/playerimages/${p.id}.png`}
              onError={(e) => (e.target.src = imgPlaceholder)}
              alt=""
              className=" h-8 sm:h-12  bottom-0"
              data-pos={pos}
              draggable={false}
            />
          </div>
          <div
            className={` text-[7px] sm:text-[12px] text-center text-white has-tooltip z-50 flex justify-center flex-wrap`}
            data-pos={pos}
          >
            {p.name.split(" ")[p.name.split(" ").length - 1]}
            {/* <span className="tooltip text-[12px] w-[50px] text-center bg-[#1D1D1D] outline outline-1 outline-[white] text-white mt-2 px-1 z-50">
            {p.name}
          </span> */}
          </div>
        </>
      ) : (
        <>
          {/* <PlayerIconSvg /> */}
          <div className=" h-[32px] sm:h-[52px] sm:w-[52px] w-[32px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden">
            <img src={imgPlaceholder} alt="" className=" h-8 w-8 sm:w-12 sm:h-12 bottom-0" />
          </div>
          <div className=" text-[12px] text-center text-[#1D1D11D] bg-white rounded-full h-3 w-3 flex justify-center items-center">
            +
          </div>
        </>
      )}
    </button>
  );
};

export default PlayerPic;
