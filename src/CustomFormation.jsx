import React, { useState } from "react";
import PlayerIconSvg from "./assets/PlayerIconSvg";

const CustomFormation = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e) => {
        setIsDragging(true);
    };

    const handleDragEnd = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrag = (e) => {
        if (isDragging) {
            setPositions({ x: e.clientX >= 0 ? e.clientX - 360 : 0, y: e.clientY >= 0 ? e.clientY - 360 : 0 }); 
        }
        
    };

    return (
        <div 
            className="w-full h-[500px] bg-slate-400 relative" 
            onDrop={(e) => { e.preventDefault(); console.log('dropped'); }} 
            onDragOver={(e) => { e.preventDefault(); }}
            onDrag={handleDrag}
        >
            <div 
                draggable={true} 
                style={{ left: `${positions.x}px`, top: `${positions.y}px` }} 
                className="absolute cursor-pointer w-fit"
                onDragEnd={handleDragEnd} 
                onDragStart={handleDragStart}
            > 
                <PlayerIconSvg />
            </div>
        </div>
    );
};

export default CustomFormation;
