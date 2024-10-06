import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [lineup, setLineup] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getLineup = async () => {
      try {
        const res = await fetch(`https://lineup-builder-server.onrender.com/get-lineup/${id}`);
        const data = await res.json();
        setLineup(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getLineup();
  }, [id]);

  return (
    <div className=" flex justify-center items-center">
      <div className=" text-white bg-white w-[785px] m-auto py-5 px-2 sm:px-8">
        <div className=" bg-green-700 relative h-[880px] overflow-hidden">
          <div className="absolute w-full h-[88px] top-[0px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[88px] top-[176px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[88px] top-[352px] bg-black bg-opacity-5"></div>
          <div className="absolute w-full h-[88px] top-[528px] bg-black bg-opacity-5 z-20"></div>
          <div className="absolute w-full h-[88px] top-[704px] bg-black bg-opacity-5 z-20"></div>
          <div className="absolute h-[44px] sm:h-[64px] w-28 sm:w-40 border-opacity-30 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[180px] w-[180px] border-opacity-30 rounded-full border-4 border-solid border-[white] top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[10px] w-[10px] rounded-full bg-[white] bg-opacity-45 top-0 translate-y-[-50%] left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-[70px] w-[70px] border-t-4 border-r-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[-50%] left-0 z-20"></div>
          <div className="absolute h-[70px] w-[70px] border-t-4 border-l-4 border border-opacity-30 rounded-full border-[white] bg-opacity-45 bottom-0 translate-y-[50%] translate-x-[50%] right-0 z-20"></div>
          <div className="absolute h-28 sm:h-40 w-60 sm:w-96 border-opacity-30 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%] bg-green-700 z-10"></div>
          <div className="absolute h-[128px] sm:h-[192px] w-44 border-opacity-30 rounded-t-full border-4 border-b-0 border-solid border-[white] bottom-0 left-[50%] translate-x-[-50%]"></div>
          <div>
            {lineup.players &&
              lineup?.players.map((player, idx) => (
                <div
                  key={idx}
                  className={` text-[7px] sm:text-[12px] text-center text-white has-tooltip z-50 flex justify-center flex-col items-center gap-1 flex-wrap absolute ${lineup.positions[idx]}`}
                >
                  <div className=" h-[44px] sm:h-[54px] sm:w-[54px] w-[44px] justify-center rounded-full bg-[white] flex items-end overflow-hidden">
                    <img
                      src={`https://images.fotmob.com/image_resources/playerimages/${player.id}.png`}
                      alt=""
                      className="h-10 sm:h-[50px]  bottom-0"
                    />
                  </div>
                  <div className=" text-[14px] sm:text-[16px] text-center text-white has-tooltip z-50 flex justify-center flex-wrap">
                    {player.name.split(" ")[player.name.split(" ").length - 1]}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadLineup;
