import React, { useEffect, useState } from "react";
import SearchSvg from "./assets/SearchSvg";
import Cancel from "./assets/Cancel";

const PreFillLineup = ({
  teamId,
  setTeamId,
  lineupNotFound,
  setSwitchMode,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch(
          `https://lineup-builder-server.onrender.com/search?p=${searchParam}`
        );
        const data = await response.json();
        setSearchResult(
          data
            .filter((d) => d.title.key === "teams")
            .map((s) => s.suggestions)[0]
        );
      } catch (error) {
        console.log(error);
      }
    };
    getTeams();
  }, [searchParam]);
  const handleClick = (e) => {
    setSwitchMode("fetched");

    if (!lineupNotFound) {
      setTeamId(e.target.dataset.id);
    }
  };
  return (
    <div className=" bg-[#1D1D1D] py-3 text-white rounded-b-xl">
      <h3 className=" text-lg px-3">Pre-fill Lineup</h3>
      <h5 className="text-[12px] mb-2 text-[#9F9F9F] px-3">
        Choose a team to edit
      </h5>
      <div className="relative mb-1 px-3">
        <div className="flex bg-[#2C2C2C] rounded-full items-center px-2">
          <SearchSvg />
          <input
            className=" bg-transparent outline-none indent-1 text-[12px] py-[4px] w-full"
            placeholder="search"
            type="text"
            name=""
            id=""
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            onFocus={() => setShowSearch(true)}
            //   onBlur={() => setShowSearch(false)}
          />
          <Cancel setSearchParam={setSearchParam} searchParam={searchParam} />
        </div>
        <div
          className={`${
            showSearch ? "block" : "hidden"
          } absolute bg-[#1D1D1D] shadow-md w-[90%] overflow-y-scroll scroll_bar max-h-[500px] mt-1 py-2 rounded-xl`}
        >
          <div className="">
            {searchResult?.length > 1 && <div>Search for Teams</div>}
            {searchResult?.map((s) => (
              <button
                className="flex gap-4 items-center w-full cursor-pointer hover:bg-[#2C2C2C] px-4 py-2"
                onClick={(e) => {
                  handleClick(e);
                  setShowSearch(false);
                }}
                data-id={s.id}
                key={s.id}
              >
                <img
                  className="w-5 h-5"
                  src={`https://images.fotmob.com/image_resources/logo/teamlogo/${s.id}_xsmall.png`}
                  alt=""
                  data-id={s.id}
                />
                <div className=" flex flex-col text-left" data-id={s.id}>
                  <div className=" text-[12px]" data-id={s.id}>
                    {s.name}
                  </div>
                  <div className=" text-[10px] text-[#9F9F9F]" data-id={s.id}>
                    {s.leagueName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full h-[1px] my-2 bg-[#2C2C2C]"></div>
      <h5 className=" text-[12px] py-1 text-[#9F9F9F] px-3">
        Pre-fill with popular teams
      </h5>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8633"
      >
        <img
          className="w-4 h-4"
          src={`https://images.fotmob.com/image_resources/logo/teamlogo/8633_xsmall.png`}
          alt=""
          data-id="8633"
        />
        <div className=" text-[14px] text-white" data-id="8633">
          Real Madrid
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8634"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8634_xsmall.png"
          alt=""
          data-id="8634"
        />
        <div className=" text-[12px] text-white" data-id="8634">
          Barcelona
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="10260"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/10260_xsmall.png"
          alt=""
          data-id="10260"
        />
        <div className=" text-[12px] text-white" data-id="10260">
          Manchester United
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8650"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8650_xsmall.png"
          alt=""
          data-id="8650"
        />
        <div className=" text-[12px] text-white" data-id="8650">
          Liverpool
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="9825"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/9825_xsmall.png"
          alt=""
          data-id="9825"
        />
        <div className=" text-[12px] text-white" data-id="9825">
          Arsenal
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8455"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8455_xsmall.png"
          alt=""
          data-id="8455"
        />
        <div className=" text-[12px] text-white" data-id="8455">
          Chelsea
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8586"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8586_xsmall.png"
          alt=""
          data-id="8586"
        />
        <div className=" text-[12px] text-white" data-id="8586">
          Tottenham
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="8456"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8456_xsmall.png"
          alt=""
          data-id="8456"
        />
        <div className=" text-[12px] text-white" data-id="8456">
          Manchester City
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="9823"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/9823_xsmall.png"
          alt=""
          data-id="9823"
        />
        <div className=" text-[12px] text-white" data-id="9823">
          Bayern München
        </div>
      </div>
      <div
        onClick={handleClick}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4"
        data-id="10261"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/10261_xsmall.png"
          alt=""
          data-id="10261"
        />
        <div className=" text-[12px] text-white" data-id="10261">
          Newcastle
        </div>
      </div>
    </div>
  );
};

export default PreFillLineup;
