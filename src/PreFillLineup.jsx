import React, { useEffect, useRef, useState } from "react";
import SearchSvg from "./assets/SearchSvg";
import Cancel from "./assets/Cancel";
import { teamImgPlaceholder } from "./assets/assets";

const PreFillLineup = ({
  teamId,
  setTeamId,
  lineupNotFound,
  setSwitchMode,
  setRecentTeams,
  recentTeams,
  getTeams,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const ref = useRef(null);
  const inputRef = useRef(null);


  const handleClickAway = (e) => {
    if (ref.current && inputRef.current && !ref.current.contains(e.target) && !inputRef.current.contains(e.target)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);

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
    getTeams(e.target.dataset.id);
    console.log(e.target.dataset.id);
    if (!lineupNotFound) {
      setTeamId(e.target.dataset.id);
      // setSwitchMode("fetched");
    } else {
      // setSwitchMode("custom");
    }

    const newRecentTeam = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      leagueName: e.target.dataset.leaguename,
    };

    const isPlayerAlreadyAdded = recentTeams.some(
      (p) => p.id === newRecentTeam.id
    );
    if (!isPlayerAlreadyAdded) {
      setRecentTeams([...recentTeams, newRecentTeam]);
    }
  };
  const handleClick2 = (e) => {
    getTeams(e.target.dataset.id);
    if (!lineupNotFound) {
      setTeamId(e.target.dataset.id);
      // setSwitchMode("fetched");
    } else {
      // setSwitchMode("custom");
    }
  };
  const handleCancel = () => {
    setSearchParam("");
  };
  return (
    <div className=" bg-[#1D1D1D] py-3 text-white rounded-b-xl">
      <h3 className=" text-lg px-3">Pre-fill Lineup</h3>
      <h5 className="text-[12px] mb-2 text-[#9F9F9F] px-3">
        Choose a team to edit
      </h5>
      <div className="relative mb-1 px-3">
        <div
          className="flex bg-[#2C2C2C] rounded-full items-center px-3 py-1"
          ref={inputRef}
        >
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
          {searchParam.length !== 0 && (
            <Cancel
              setSearchParam={setSearchParam}
              searchParam={searchParam}
              handleCancel={handleCancel}
            />
          )}
        </div>
        <div
          className={`${
            showSearch ? "block" : "hidden"
          } absolute bg-[#1D1D1D] shadow-md w-[90%] overflow-y-scroll scroll_bar max-h-[500px] mt-1 py-2 rounded-xl min-h-[350px]`}
           ref={ref}
        >
          <div className="">
            {searchParam.length > 0 && !searchResult && (
              <div className=" px-3 opacity-50 h-fit text-center mt-10">
                No Results Found for {searchParam}
              </div>
            )}
            {searchParam.length == 0 && (
              <div>
                <h3 className=" px-3">
                  {recentTeams.length > 0 ? "Recent" : "No recent Teams"}
                </h3>
                {recentTeams.map((r) => (
                  <div
                    className="flex  items-center justify-between w-full cursor-pointer hover:bg-[#2C2C2C] px-4 py-1"
                    data-id={r.id}
                    data-name={r.name}
                    data-leaguename={r.leagueName}
                    key={r.id}
                  >
                    <button
                      className=" flex items-center gap-4 w-full h-[36px]"
                      onClick={(e) => {
                        handleClick(e);
                        // setShowSearch(false);
                      }}
                      data-id={r.id}
                      data-name={r.name}
                      data-leaguename={r.leagueName}
                    >
                      <img
                        className="w-5 h-5"
                        src={`https://images.fotmob.com/image_resources/logo/teamlogo/${r.id}_xsmall.png`}
                        alt=""
                        data-id={r.id}
                        data-name={r.name}
                        data-leaguename={r.leagueName}
                        onError={(e) => (e.target.src = teamImgPlaceholder)}
                      />
                      <div
                        className=" flex flex-col text-left"
                        data-id={r.id}
                        data-name={r.name}
                        data-leaguename={r.leagueName}
                      >
                        <div
                          className=" text-[12px]"
                          data-id={r.id}
                          data-name={r.name}
                          data-leaguename={r.leagueName}
                        >
                          {r.name}
                        </div>
                        <div
                          className=" text-[10px] text-[#9F9F9F]"
                          data-id={r.id}
                          data-name={r.name}
                          data-leaguename={r.leagueName}
                        >
                          {r.leagueName}
                        </div>
                      </div>
                    </button>
                    <Cancel
                      handleCancel={() => {
                        setRecentTeams(
                          recentTeams.filter((team) => team.id !== r.id)
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
            {searchParam.length > 0 && searchResult && (
              <div className=" px-3">Search for Teams</div>
            )}
            {searchParam.length > 0 &&
              searchResult?.map((s) => (
                <button
                  className="flex gap-4 items-center w-full cursor-pointer hover:bg-[#2C2C2C] px-4 py-2 outline-none focus:bg-[#2c2c2c]"
                  onClick={(e) => {
                    handleClick(e);
                    setShowSearch(false);
                  }}
                  data-id={s.id}
                  data-name={s.name}
                  data-leaguename={s.leagueName}
                  key={s.id}
                >
                  <img
                    className="w-5 h-5"
                    src={`https://images.fotmob.com/image_resources/logo/teamlogo/${s.id}_xsmall.png`}
                    alt=""
                    data-id={s.id}
                    data-name={s.name}
                    data-leaguename={s.leagueName}
                    onError={(e) => (e.target.src = teamImgPlaceholder)}
                  />
                  <div
                    className=" flex flex-col text-left"
                    data-id={s.id}
                    data-name={s.name}
                    data-leaguename={s.leagueName}
                  >
                    <div
                      className=" text-[12px]"
                      data-id={s.id}
                      data-name={s.name}
                      data-leaguename={s.leagueName}
                    >
                      {s.name}
                    </div>
                    <div
                      className=" text-[10px] text-[#9F9F9F]"
                      data-id={s.id}
                      data-name={s.name}
                      data-leaguename={s.leagueName}
                    >
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
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8633"
      >
        <img
          className="w-4 h-4"
          src={`https://images.fotmob.com/image_resources/logo/teamlogo/8633_xsmall.png`}
          alt=""
          data-id="8633"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[14px] text-white" data-id="8633">
          Real Madrid
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8634"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8634_xsmall.png"
          alt=""
          data-id="8634"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="8634">
          Barcelona
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="10260"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/10260_xsmall.png"
          alt=""
          data-id="10260"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="10260">
          Manchester United
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8650"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8650_xsmall.png"
          alt=""
          data-id="8650"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="8650">
          Liverpool
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="9825"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/9825_xsmall.png"
          alt=""
          data-id="9825"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="9825">
          Arsenal
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8455"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8455_xsmall.png"
          alt=""
          data-id="8455"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="8455">
          Chelsea
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8586"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8586_xsmall.png"
          alt=""
          data-id="8586"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="8586">
          Tottenham
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="8456"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/8456_xsmall.png"
          alt=""
          data-id="8456"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="8456">
          Manchester City
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="9823"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/9823_xsmall.png"
          alt=""
          data-id="9823"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="9823">
          Bayern München
        </div>
      </button>
      <button
        onClick={handleClick2}
        className=" py-2 px-4 hover:bg-[#2C2C2C] cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-[#2c2c2c]"
        data-id="10261"
      >
        <img
          className="w-4 h-4"
          src="https://images.fotmob.com/image_resources/logo/teamlogo/10261_xsmall.png"
          alt=""
          data-id="10261"
          onError={(e) => (e.target.src = teamImgPlaceholder)}
        />
        <div className=" text-[12px] text-white" data-id="10261">
          Newcastle
        </div>
      </button>
    </div>
  );
};

export default PreFillLineup;
