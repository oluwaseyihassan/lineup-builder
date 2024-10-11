import React, { useState } from "react";
import PlayerIconSvg from "./assets/PlayerIconSvg";

const CustomFormation = () => {
  const [positions, setPositions] = useState({
    0: { left: 20, top: 0 },
    1: { left: 40, top: 0 },
    2: { left: 60, top: 0 },
    3: { left: 80, top: 0 },
    4: { left: 100, top: 0 },
    5: { left: 40, top: 100 },
    6: { left: 120, top: 0 },
    7: { left: 140, top: 0 },
    8: { left: 160, top: 0 },
    9: { left: 180, top: 0 },
    10: { left: 200, top: 0 },
  });

  const [team] = useState([
    { id: null, name: "", idx: 0 },
    { id: null, name: "", idx: 1 },
    { id: null, name: "", idx: 2 },
    { id: null, name: "", idx: 3 },
    { id: null, name: "", idx: 4 },
    { id: null, name: "", idx: 5 },
    { id: null, name: "", idx: 6 },
    { id: null, name: "", idx: 7 },
    { id: null, name: "", idx: 8 },
    { id: null, name: "", idx: 9 },
    { id: null, name: "", idx: 10 },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const idx = e.target.dataset.idx;
    if (
      isDragging &&
      e.clientY < 480 &&
      e.clientY > 0 &&
      e.clientX > (window.innerWidth - 400) / 2 &&
      e.clientX < (window.innerWidth - 400) / 2 + 380 &&
      idx !== undefined
    ) {
      // Calculate new position
      const newLeft = e.clientX - (window.innerWidth - 400) / 2 - 10;
      const newTop = e.clientY - 10;

      // Update the positions state with the new coordinates
      setPositions({
        ...positions,
        [idx]: { left: newLeft, top: newTop },
      });
    }
  };

  return (
    <div
      className="h-[500px] w-[400px] bg-green-700 relative m-auto"
    //   onDrop={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      {team.map((player) => (
        <div
          key={player.idx} // Ensure a unique key for each element
          draggable={true}
          className={`absolute cursor-pointer w-fit transition-all duration-200 z-20`}
          style={{
            left: `${positions[player.idx].left}px`,
            top: `${positions[player.idx].top}px`,
          }}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          data-idx={player.idx}
        >
          <PlayerIconSvg />
          <div>{player.idx}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomFormation;
