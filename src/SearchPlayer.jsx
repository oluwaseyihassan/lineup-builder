import React, { useState, useEffect } from "react";
import { imgPlaceholder } from "./assets/assets";
import SearchSvg from "./assets/SearchSvg";
import Cancel from "./assets/Cancel";

const SearchPlayer = ({
  showSearch,
  setShowSearch,
  customTeam,
  setCustomTeam,
  clickedPlayer,
  setErrorAlert,
  setTeam,
  team,
  switchMode,
  setSwitchMode,
  setPositions,
  clickedPlayerData,
  suggestedLineup,
  setRecentPlayers,
  recentPlayers,
}) => {
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [restorePlayer, setRestorePlayer] = useState([
    {
      id: null,
      name: "",
      idx: 0,
    },
    {
      id: null,
      name: "",
      idx: 1,
    },
    {
      id: null,
      name: "",
      idx: 2,
    },
    {
      id: null,
      name: "",
      idx: 3,
    },
    {
      id: null,
      name: "",
      idx: 4,
    },
    {
      id: null,
      name: "",
      idx: 5,
    },
    {
      id: null,
      name: "",
      idx: 6,
    },
    {
      id: null,
      name: "",
      idx: 7,
    },
    {
      id: null,
      name: "",
      idx: 8,
    },
    {
      id: null,
      name: "",
      idx: 9,
    },
    {
      id: null,
      name: "",
      idx: 10,
    },
  ]);
  const [restoreCustomPlayer, setRestoreCustomPlayer] = useState([
    {
      id: null,
      name: "",
      idx: 0,
    },
    {
      id: null,
      name: "",
      idx: 1,
    },
    {
      id: null,
      name: "",
      idx: 2,
    },
    {
      id: null,
      name: "",
      idx: 3,
    },
    {
      id: null,
      name: "",
      idx: 4,
    },
    {
      id: null,
      name: "",
      idx: 5,
    },
    {
      id: null,
      name: "",
      idx: 6,
    },
    {
      id: null,
      name: "",
      idx: 7,
    },
    {
      id: null,
      name: "",
      idx: 8,
    },
    {
      id: null,
      name: "",
      idx: 9,
    },
    {
      id: null,
      name: "",
      idx: 10,
    },
  ]);
  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await fetch(
          `https://lineup-builder-server.onrender.com/search?p=${searchParam}`
        );
        const data = await response.json();
        setSearchResult(
          data
            ?.filter((d) => d.title.key === "players")
            .map((s) => s.suggestions)[0]
            .filter((s) => s.isCoach === false)
        );
      } catch (error) {
        console.log(error);
        setErrorAlert("error fetching data");
      }
    };
    getTeams();
  }, [searchParam]);

  const handleClick = (e) => {
    const newPlayer = {
      name: e.target.dataset.name,
      id: e.target.dataset.id,
      idx: clickedPlayer,
    };

    const newRecentPlayers = {
      name: e.target.dataset.name,
      id: e.target.dataset.id,
      idx: clickedPlayer,
      teamName: e.target.dataset.teamname,
    };

    const isPlayerAlreadyAdded = recentPlayers.some(
      (p) => p.id == newRecentPlayers.id
    );

    if (!isPlayerAlreadyAdded) {
      setRecentPlayers([...recentPlayers, newRecentPlayers]);
    }

    if (switchMode === "custom") {
      const updatedTeam = [...customTeam];
      for (let i = 0; i < restoreCustomPlayer.length; i++) {
        const element = restoreCustomPlayer[i];

        if (element.id == newPlayer.id) {
          let restoreCustom = [...restoreCustomPlayer];
          restoreCustom[element.idx] = { name: "", id: "", idx: element.idx };
          setRestoreCustomPlayer(restoreCustom);
        }
      }

      for (let i = 0; i < customTeam.length; i++) {
        const element = customTeam[i];
        if (element.id == newPlayer.id) {
          updatedTeam[clickedPlayer] = newPlayer;
          updatedTeam[element.idx] = { ...clickedPlayerData, idx: element.idx };

          setShowSearch(false);
        } else {
          updatedTeam[clickedPlayer] = newPlayer;
          setCustomTeam(updatedTeam);
          setShowSearch(false);
        }
      }
    }

    if (switchMode === "fetched") {
      const updatedTeam2 = [...team];
      for (let i = 0; i < restorePlayer.length; i++) {
        const element = restorePlayer[i];

        if (element.id == newPlayer.id) {
          let restore = [...restorePlayer];
          restore[element.idx] = { name: "", id: "", idx: element.idx };
          setRestorePlayer(restore);
        }
      }

      for (let i = 0; i < team.length; i++) {
        const element = team[i];
        if (element.id == newPlayer.id) {
          updatedTeam2[clickedPlayer] = newPlayer;
          updatedTeam2[element.idx] = {
            ...clickedPlayerData,
            idx: element.idx,
          };

          setShowSearch(false);
        } else {
          updatedTeam2[clickedPlayer] = newPlayer;
          setTeam(updatedTeam2);
          setShowSearch(false);
        }
      }
    }

    setSearchParam("");
  };

  const handleCancel = () => {
    setSearchParam("");
  };

  const removePlayer = () => {
    let updatedTeam, updatedRestored;

    if (switchMode === "fetched") {
      updatedTeam = [...team];
      updatedRestored = [...restorePlayer];
      updatedRestored[clickedPlayer] = team[clickedPlayer];
      setRestorePlayer(updatedRestored);

      updatedTeam[clickedPlayer] = { id: null, name: "", idx: clickedPlayer };
      setTeam(updatedTeam);
    } else if (switchMode === "custom") {
      updatedTeam = [...customTeam];
      updatedRestored = [...restoreCustomPlayer];
      updatedRestored[clickedPlayer] = customTeam[clickedPlayer];
      setRestoreCustomPlayer(updatedRestored);

      updatedTeam[clickedPlayer] = { id: null, name: "", idx: clickedPlayer };
      setCustomTeam(updatedTeam);
    }

    setShowSearch(false);
  };

  const restorePlayerFunc = () => {
    if (switchMode === "fetched") {
      const updatedTeam = [...team];
      updatedTeam[clickedPlayer] = restorePlayer[clickedPlayer];
      setTeam(updatedTeam);
    }
    if (switchMode === "custom") {
      const updatedTeam = [...customTeam];
      updatedTeam[clickedPlayer] = restoreCustomPlayer[clickedPlayer];
      setCustomTeam(updatedTeam);
    }
    setShowSearch(false);
  };

  const shouldShowRestoreButton =
    switchMode === "fetched"
      ? restorePlayer[clickedPlayer]?.id && !clickedPlayerData?.id
      : restoreCustomPlayer[clickedPlayer]?.id && !clickedPlayerData?.id;

  return (
    <div
      className={`${
        showSearch ? "block" : "hidden"
      } fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] z-40  bg-[#1D1D1D]   rounded-md mt-1 pt-4`}
    >
      <div className=" px-3 flex bg-[#2C2C2C] rounded-full w-[94%] py-1 items-center m-auto">
        <SearchSvg />
        <input
          type="text"
          name=""
          value={searchParam}
          id=""
          onChange={(e) => {
            setSearchParam(e.target.value);
          }}
          className="  bg-transparent outline-none text-white text-[12px] py-1 indent-1 w-full"
          placeholder="search"
        />
        {searchParam.length !== 0 && (
          <Cancel
            setSearchParam={setSearchParam}
            searchParam={searchParam}
            handleCancel={handleCancel}
          />
        )}
      </div>
      {clickedPlayerData?.id && (
        <button
          onClick={() => {
            removePlayer();
          }}
          className=" bg-red-500 text-white px-3 rounded-md mt-2 ml-2 text-[12px]"
        >
          Remove selected player
        </button>
      )}
      {shouldShowRestoreButton && (
        <button
          onClick={restorePlayerFunc}
          className="bg-green-500 text-white px-3 rounded-md mt-2 ml-2 text-[12px]"
        >
          Restore removed player
        </button>
      )}
      <div className=" overflow-y-scroll scroll_bar h-[400px] md:h-[500px] bg-inherit text-white mt-2 w-[300px]">
        {searchParam == "" && switchMode == "fetched" && (
          <div className=" flex gap-2 items-center px-5 mb-1">
            <img
              src={`https://images.fotmob.com/image_resources/logo/teamlogo/${suggestedLineup?.teamId}_xsmall.png`}
              alt=""
              className=" w-[14px] h-[14px]"
            />
            <div className=" text-[12px]">Suggested Players</div>
          </div>
        )}

        {suggestedLineup && searchParam == "" && switchMode == "fetched" && (
          <div>
            {suggestedLineup.players.map((s) => (
              <button
                key={s.id}
                className=" flex cursor-pointer gap-3 py-2 hover:bg-[#2C2C2C] outline-none focus:bg-[#2C2C2C] w-full px-4 items-center"
                data-name={s.name}
                data-id={s.id}
                onClick={handleClick}
                data-teamname={s.teamName}
              >
                <div
                  className=" h-[24px] w-[24px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden"
                  data-name={s.name}
                  data-id={s.id}
                  data-teamname={s.teamName}
                >
                  <img
                    className="w-5 h-5"
                    src={`https://images.fotmob.com/image_resources/playerimages/${s.id}.png`}
                    onError={(e) => (e.target.src = imgPlaceholder)}
                    alt=""
                    data-name={s.name}
                    data-id={s.id}
                    data-teamname={s.teamName}
                  />
                </div>
                <div
                  className=" flex flex-col text-left"
                  data-name={s.name}
                  data-id={s.id}
                  data-teamname={s.teamName}
                >
                  <div
                    data-name={s.name}
                    data-id={s.id}
                    data-teamname={s.teamName}
                    className=" text-[12px]"
                  >
                    {s.name}
                  </div>
                  <div
                    data-name={s.name}
                    data-id={s.id}
                    data-teamname={s.teamName}
                    className=" text-[10px] text-[#9F9F9F]"
                  >
                    {s.teamName}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        {searchParam == "" && (
          <div>
            {recentPlayers.length > 0 && (
              <div className=" text-[12px] px-4">Recent</div>
            )}
            {
              recentPlayers.length == 0 && <div className=" text-[12px] flex justify-center h-full items-center">No recent players</div>
            }

            <div>
              {recentPlayers.map((r) => (
                <button
                  key={r.id}
                  className=" flex cursor-pointer justify-between py-1 hover:bg-[#2C2C2C] outline-none focus:bg-[#2C2C2C] w-full px-4 items-center"
                  data-name={r.name}
                  data-id={r.id}
                  data-teamname={r.teamName}
                >
                  <div
                    className="flex items-center gap-3 w-full h-[36px]"
                    onClick={handleClick}
                    data-name={r.name}
                    data-id={r.id}
                    data-teamname={r.teamName}
                  >
                    <div
                      className=" h-[24px] w-[24px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden"
                      data-name={r.name}
                      data-id={r.id}
                      data-teamname={r.teamName}
                    >
                      <img
                        className="w-5 h-5"
                        src={`https://images.fotmob.com/image_resources/playerimages/${r.id}.png`}
                        onError={(e) => (e.target.src = imgPlaceholder)}
                        alt=""
                        data-name={r.name}
                        data-id={r.id}
                        data-teamname={r.teamName}
                      />
                    </div>
                    <div
                      className=" flex flex-col text-left"
                      data-name={r.name}
                      data-id={r.id}
                      data-teamname={r.teamName}
                    >
                      <div
                        data-name={r.name}
                        data-id={r.id}
                        data-teamname={r.teamName}
                        className=" text-[12px]"
                      >
                        {r.name}
                      </div>

                      <div
                        data-name={r.name}
                        data-id={r.id}
                        data-teamname={r.teamName}
                        className=" text-[10px] text-[#9F9F9F]"
                      >
                        {r.teamName}
                      </div>
                    </div>
                  </div>
                  <Cancel
                    handleCancel={() => {
                      setRecentPlayers(
                        recentPlayers.filter((player) => player.id !== r.id)
                      );
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
        {searchParam != "" &&
          searchResult?.map((s) => (
            <button
              key={s.id}
              className=" flex cursor-pointer gap-3 py-2 hover:bg-[#2C2C2C] outline-none focus:bg-[#2C2C2C] w-full px-4 items-center"
              data-name={s.name}
              data-id={s.id}
              onClick={handleClick}
              data-teamname={s.teamName}
            >
              <div
                className=" h-[24px] w-[24px] justify-center rounded-full bg-[#383838] flex items-end overflow-hidden"
                data-name={s.name}
                data-id={s.id}
                data-teamname={s.teamName}
              >
                <img
                  className="w-5 h-5"
                  src={`https://images.fotmob.com/image_resources/playerimages/${s.id}.png`}
                  onError={(e) => (e.target.src = imgPlaceholder)}
                  alt=""
                  data-name={s.name}
                  data-id={s.id}
                  data-teamname={s.teamName}
                />
              </div>
              <div
                className=" flex flex-col text-left"
                data-name={s.name}
                data-id={s.id}
                data-teamname={s.teamName}
              >
                <div
                  data-name={s.name}
                  data-id={s.id}
                  data-teamname={s.teamName}
                  className=" text-[12px]"
                >
                  {s.name}
                </div>

                <div
                  data-name={s.name}
                  data-id={s.id}
                  data-teamname={s.teamName}
                  className=" text-[10px] text-[#9F9F9F]"
                >
                  {s.teamName}
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default SearchPlayer;
