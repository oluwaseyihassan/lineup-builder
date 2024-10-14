import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";

const DownloadLineup = ({
  team,
  setTeam,
  customTeam,
  setCustomTeam,
  switchMode,
  formation,
  positions,
  setPositions,
  setFormation,
  setSwitchMode,
  finalFormation,
}) => {
  const componentRef = useRef();

  const [lineup, setLineup] = useState({});
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)

  const { id } = useParams();

  useEffect(() => {
    const getLineup = async () => {
      try {
        const res = await fetch(
          `https://lineup-builder-server.onrender.com/get-lineup/${id}`
        );
        const data = await res.json();
        setLineup(data);
      } catch (err) {
        console.log(err);
      }
    };
    getLineup();
  }, [id]);

 
  const handleWindowSizeChange = () => {
    setWindowWidth(window.innerWidth);
  };


  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleCapture = async () => {
    html2canvas(componentRef.current)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "component-image.png";
        link.click();
      })
      .catch((err) => {
        console.error("Error capturing the image:", err);
      });
  };



  return (
    <div className=" flex justify-center items-center">
      <div className=" text-white bg-green-700 w-[785px] m-auto " ref={componentRef}>
        <div className=" flex justify-between px-4 py-2 bg-green-900 items-center">
          <div className=" text-lg">{lineup?.team}</div>
          <div className=" text-base">{lineup?.formation}</div>
        </div>
        <div className=" bg-green-700 relative h-[500px] sm:h-[880px] overflow-hidden sm:border-l-4 sm:border-t-[2px] border-t-[1.5px] sm:border-r-4 sm:border-b-4 border-l-[3px] border-r-[3px] border-b-[3px] border-opacity-30  border-solid border-white">
          <div className="absolute w-full h-[50px] sm:h-[88px] sm:top-0 top-[0px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[50px] sm:h-[88px] sm:top-[176px] top-[100px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[50px] sm:h-[88px] sm:top-[352px] top-[200px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[50px] sm:h-[88px] sm:top-[528px] top-[300px] bg-black bg-opacity-5 z-20"></div>
          <div className="absolute w-full h-[50px] sm:h-[88px] sm:top-[704px] top-[400px] bg-black bg-opacity-5 z-20"></div>
          <div className="absolute h-[40px] sm:h-[64px] w-24 sm:w-40 border-opacity-30 sm:rounded-tl-lg sm:rounded-tr-lg rounded-tl-md rounded-tr-md border-r-[3px] border-l-[3px] border-t-[3px] sm:border-r-4 sm:border-l-4 sm:border-t-4 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute sm:h-[180px]  h-[110px] w-[110px] sm:w-[180px]  border-opacity-30 rounded-full border-[3px] sm:border-4 border-solid border-[white] top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[10px] w-[10px]  rounded-full bg-[white] bg-opacity-45 top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[50px] sm:h-[70px] w-[50px] sm:w-[70px]  border-t-[3px] sm:border-t-4 border-r-[3px] sm:border-r-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[-50%] left-0 z-20"></div>
          <div className="absolute h-[50px] sm:h-[70px] w-[50px] sm:w-[70px] border-t-[3px] sm:border-t-4 border-l-[3px] sm:border-l-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[50%] right-0 z-20"></div>
          <div className="absolute h-[90px] sm:h-40   w-48  sm:w-96 border-opacity-30 sm:rounded-tl-lg sm:rounded-tr-lg rounded-tl-md rounded-tr-md border-r-[3px] border-l-[3px] border-t-[3px] sm:border-r-4 sm:border-l-4 sm:border-t-4 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] bg-green-700 z-10"></div>
          <div className="absolute h-[105px]  sm:h-[192px]  w-32 sm:w-44 border-opacity-30 rounded-t-full border-[3px] sm:border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%]"></div>
          <div className=" ">
            {lineup.players &&
              lineup?.players.map((player, idx) => (
                <div
                  key={idx}
                  className={` text-[7px] sm:text-[12px] w-[60px] text-center text-white has-tooltip z-50 flex justify-center flex-col items-center gap-1 absolute ${
                    lineup.formation === "custom" ? "" : lineup.positions[idx]
                  }`}
                  style={lineup.formation === 'custom' ? {
                    left: `${lineup.positions[idx].left}%`,
                    top: `${lineup.positions[idx].top}%`,
                  } : {}}
                >
                  <div className=" h-[32px] sm:h-[54px] sm:w-[54px] w-[32px] justify-center rounded-full bg-[white] flex items-end overflow-hidden">
                    <img
                      src={`https://images.fotmob.com/image_resources/playerimages/${player.id}.png`}
                      alt=""
                      className="h-7 sm:h-[50px]  bottom-0"
                    />
                  </div>
                  <div className=" text-[10px] sm:text-[16px] text-center text-white has-tooltip z-50 flex justify-center flex-wrap">
                    {player.name.split(" ")[player.name.split(" ").length - 1]}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <button
        className=" fixed bottom-10 right-10 rounded-xl bg-white px-4 py-2 animate-bounce"
        onClick={handleCapture}
      >
        download
      </button>
    </div>
  );
};

export default DownloadLineup;
