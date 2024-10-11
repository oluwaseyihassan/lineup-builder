import React, { useState } from "react";
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
  customFormation,
  setCustomFormation,
  customPositions,
  setCustomPositions,
  setClickedPlayerData,
  clickedPlayerData,
  c,
}) => {
  
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (e) => {
    setShowSearch(true);
    console.log(e.target.dataset.pos);
    setClickedPlayer(e.target.dataset.pos);
    setClickedPlayerData(customTeam[pos]);
    setSwitchMode("custom");

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
    }
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove("opacity-30");
    if (customFormation === "custom") {
      e.preventDefault();
      setIsDragging(false);

      const pos = e.target.dataset.pos;
      console.log(pos);
      const parentWidth = window.getComputedStyle(e.target.parentElement.parentElement).width
      const parentHeight = window.getComputedStyle(e.target.parentElement.parentElement).height
      const differenceBtwElementAndScreenTop = e.target.parentElement.parentElement.getBoundingClientRect().top

      if (
        isDragging &&
        e.clientY < differenceBtwElementAndScreenTop + +parentHeight.slice(0,parentHeight.indexOf('p')) - 50 &&
        e.clientY > differenceBtwElementAndScreenTop + 10 &&
        e.clientX > (window.innerWidth - +parentWidth.slice(0,parentWidth.indexOf('p'))) / 2 + 10  &&
        e.clientX < (window.innerWidth - +parentWidth.slice(0,parentWidth.indexOf('p'))) / 2 + +parentWidth.slice(0,parentWidth.indexOf('p')) - 30 &&
        pos !== undefined
      ) {
        console.log(window.getComputedStyle(e.target.parentElement.parentElement));
        console.log(e.clientX,e.clientY, differenceBtwElementAndScreenTop + +parentHeight.slice(0,parentHeight.indexOf('p')));
        // const yDifference = elementTop - scrollTop
        
        // Calculate new position
        const newLeft = e.clientX - (window.innerWidth - +parentWidth.slice(0,parentWidth.indexOf('p'))) / 2 - 10;
        const newTop = e.clientY - differenceBtwElementAndScreenTop - 10;
        console.log(newTop);
        

        // Update the positions state with the new coordinates
        setCustomPositions({
          ...customPositions,
          [pos]: { left: newLeft, top: newTop },
        });
        console.log(positions[pos]);
        
      }
    }
  };

  const handleDragEnter = (e) => {
    e.target.classList.add("opacity-30");
  };
  return (
    <div
      className={`${
        customFormation === "fixed" ? style : ''
      } absolute cursor-pointer cont z-20`}
       
      style={customFormation === 'custom' ? {
        left: `${customPositions[pos].left}px`,
        top: `${customPositions[pos].top}px`,
      } : {}}
    >
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
