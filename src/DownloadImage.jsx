import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getPosition } from "./formation";
import Logo from "./assets/Logo";
import html2canvas from "html2canvas";

const DownloadImage = ({
  team,
  setTeam,
  customTeam,
  setCustomTeam,
  formation,
  setFormation,
}) => {
  const componentRef = useRef();
  const location = useLocation();
  const [playerDet, setPlayerDet] = useState([]);
  const [position, setPosition] = useState({});

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();

  const players = query.get("players");
  const lineupName = query.get("lineupName");

  const teamFormation = query.get("formation");
  useEffect(() => {
    setPlayerDet(players.split(","));
  }, [players]);

  useEffect(() => {
    setPosition(getPosition(teamFormation));
  }, [teamFormation]);

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
      <div
        className=" text-white bg-white w-[785px] m-auto py-5 px-2 sm:px-8"
        ref={componentRef}
      >
        <div className=" text-black text-[30px] font-bold px-3 flex items-center justify-between">
          {lineupName ? (
            <div className=" overflow-hidden max-w-[80%] text-ellipsis">
              {`${lineupName}'s Lineup`}
            </div>
          ) : (
            <div>Lineup Builder</div>
          )}
          <Logo style={`h-[54px]`}/>
        </div>
        <div className=" px-3 text-green-500 mb-2 text-[20px] font-semibold">
          {teamFormation}
        </div>

        {/* {query.get("players")} {query.get("formation")} */}
        <div className=" bg-green-700 relative h-[880px] overflow-hidden">
          <div className="absolute w-full h-[110px] top-[0px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[110px] top-[220px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[110px] top-[440px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[110px] top-[660px] bg-black bg-opacity-5 z-20"></div>
          <div className="absolute h-[44px] sm:h-[64px] w-28 sm:w-40 border-opacity-30 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[180px] w-[180px] border-opacity-30 rounded-full border-4 border-solid border-[white] top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[10px] w-[10px] rounded-full bg-[white] bg-opacity-45 top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[70px] w-[70px] border-t-4 border-r-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[-50%] left-0 z-20"></div>
          <div className="absolute h-[70px] w-[70px] border-t-4 border-l-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[50%] right-0 z-20"></div>
          <div className="absolute h-28 sm:h-40 w-60 sm:w-96 border-opacity-30 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] bg-green-700 z-10"></div>
          <div className="absolute h-[128px] sm:h-[192px] w-44 border-opacity-30 rounded-t-full border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%]"></div>
          {playerDet?.map((p, i) => {
            return (
              <div
                className={`absolute ${position[i]} flex flex-col gap-1 items-center w-fit z-50 justify-center `}
                key={i}
              >
                <div className=" h-[44px] sm:h-[54px] sm:w-[54px] w-[44px] justify-center rounded-full bg-[white] flex items-end overflow-hidden">
                  <img
                    src={`https://images.fotmob.com/image_resources/playerimages/${
                      p.split(":")[1]
                    }.png`}
                    alt=""
                    className=" h-10 sm:h-[50px]  bottom-0"
                  />
                </div>
                <div className=" text-center text-[16px] flex-wrap max-w-[70px] sm:max-w-[80px]">
                  {p.split(":")[0]}
                </div>
              </div>
            );
          })}
        </div>
        {/* <img src={`https://images.fotmob.com/image_resources/playerimages/${}.png`} alt="" /> */}
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

export default DownloadImage;
