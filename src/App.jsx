import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./assets/Player";
import { data } from "./data";
import LineUp from "./LineUp";
import SearchTeams from "./SearchTeams";
import PreFillLineup from "./PreFillLineup";
import SearchPlayer from "./SearchPlayer";
import Logo from "./assets/Logo";
import { Analytics } from "@vercel/analytics/react";
import { inject } from "@vercel/analytics";
import CustomFormation from "./CustomFormation";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

inject();

function App({
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
  lineupName,
  setLineupName,
  loadingLineup,
  setLoadingLineup,
  lineupNotFound,
  setLineupNotFound,
  suggestedLineup,
  setSuggestedLineup,
  teamId,
  setTeamId,
  errorAlert,
  setErrorAlert,
  finalFormation,
  setFinalFormation,
  getTeams,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [clickedPlayer, setClickedPlayer] = useState(null);
  const [clickedPlayerData, setClickedPlayerData] = useState({});
  const [recentPlayers, setRecentPlayers] = useState([]);
  const [recentTeams, setRecentTeams] = useState([]);

  const componentRef = useRef();

  const options = [
    {
      label: "4-3-3",
      value: "4-3-3",
    },
    {
      label: "4-4-2",
      value: "4-4-2",
    },
    {
      label: "4-2-3-1",
      value: "4-2-3-1",
    },
    {
      label: "4-1-4-1",
      value: "4-1-4-1",
    },
    {
      label: "4-3-2-1",
      value: "4-3-2-1",
    },
    {
      label: "4-1-2-1-2",
      value: "4-1-2-1-2",
    },
    {
      label: "3-4-3",
      value: "3-4-3",
    },
    {
      label: "3-5-2",
      value: "3-5-2",
    },
    {
      label: "3-2-4-1",
      value: "3-2-4-1",
    },
    {
      label: "5-3-2",
      value: "5-3-2",
    },
    {
      label: "5-4-1",
      value: "5-4-1",
    },
    {
      label: "4-5-1",
      value: "4-5-1",
    },
    {
      label: "4-4-1-1",
      value: "4-4-1-1",
    },
    {
      label: "4-2-2-2",
      value: "4-2-2-2",
    },
    {
      label: "4-2-4",
      value: "4-2-4",
    },
    {
      label: "3-4-2-1",
      value: "3-4-2-1",
    },
    {
      label: "3-4-1-2",
      value: "3-4-1-2",
    },
    {
      label: "4-3-1-2",
      value: "4-3-1-2",
    },
    {
      label: "5-2-3",
      value: "5-2-3",
    },
    {
      label: "5-2-2-1",
      value: "5-2-2-1",
    },
    {
      label: "4-2-1-3",
      value: "4-2-1-3",
    },
    {
      label: "4-1-2-3",
      value: "4-1-2-3",
    },
    {
      label: "3-1-4-2",
      value: "3-1-4-2",
    },
    {
      label: "4-1-3-2",
      value: "4-1-3-2",
    },
    {
      label: "4-1-2-2-1",
      value: "4-1-2-2-1",
    },
    {
      label: "3-3-4",
      value: "3-3-4",
    },
    {
      label: "3-3-3-1",
      value: "3-3-3-1",
    },
    {
      label: "5-3-1-1",
      value: "5-3-1-1",
    },
    {
      label: "3-3-2-2",
      value: "3-3-2-2",
    },
    {
      label: "3-5-1-1",
      value: "3-5-1-1",
    },
    {
      label: "2-3-2-3",
      value: "2-3-2-3",
    },
  ];

  const changeFormation = (e) => {
    setFormation(e.target.value);
  };

  // console.log(team,customTeam);
  const saveLineUp = () => {
    // console.log("save lineup");
    // if (switchMode === "fetched") {
    //   console.log(team);
    //   console.log(positions);
    // } else {
    //   console.log(customTeam);
    //   console.log(positions);
    // }

    const finalLineup = switchMode === 'fetched' ? team : customTeam

    const lineup = {
      team: lineupName ? lineupName : 'Lineup builder',
      players: [...finalLineup],
      formation: formation,
      positions: {...positions},
    };
    console.log(lineup);
    
    const save = async () => {
      try {
        const res = await fetch("https://lineup-builder-server.onrender.com/save-lineup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lineup),
        });
        const data = await res.json();
        console.log(data);
        window.open(`/lineup/${data._id}`);

      } catch (err) {
        console.log(err);
        
      }
    }
    save()
  };

  const copyLink = () => {
    console.log(finalFormation);

    // if (switchMode == "fetched") {
    // } else {
    //   setFinalFormation([...customTeam]);
    // }

    if (finalFormation) {
    }
  };
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

  // console.log(positions[7].replace(' transition-all duration-500',''));

  const downloadFormation = formation;

  const downloadImage = () => {
    const teamURL = team?.map((t) => {
      return `${t.name.split(" ")[t.name.split(" ").length - 1] + ":" + t.id}`;
    });
    const customTeamURL = customTeam?.map((t) => {
      return `${t.name.split(" ")[t.name.split(" ").length - 1] + ":" + t.id}`;
    });
    window.open(
      `/team?players=${
        switchMode == "fetched" ? teamURL : customTeamURL
      }&formation=${downloadFormation}${
        lineupName && `&lineupName=${lineupName}`
      }`,
      "_blank"
    );
  };
  useEffect(() => {
    const storedRecentPlayers = JSON.parse(
      window.localStorage.getItem("LINEUP_RECENT_PLAYERS")
    );
    if (storedRecentPlayers) {
      setRecentPlayers(storedRecentPlayers);
      console.log(storedRecentPlayers);
    }
    console.log(recentPlayers);
  }, []);

  useEffect(() => {
    console.log(recentPlayers);
    if (recentPlayers.length > 0) {
      window.localStorage.setItem(
        "LINEUP_RECENT_PLAYERS",
        JSON.stringify(recentPlayers)
      );
    }
  }, [recentPlayers]);

  useEffect(() => {
    const storedRecentTeams = JSON.parse(
      window.localStorage.getItem("LINEUP_RECENT_TEAMS")
    );
    if (storedRecentTeams) {
      setRecentTeams(storedRecentTeams);
      console.log(storedRecentTeams);
    }
    console.log(recentTeams);
  }, []);

  useEffect(() => {
    console.log(recentTeams);
    if (recentTeams.length > 0) {
      window.localStorage.setItem(
        "LINEUP_RECENT_TEAMS",
        JSON.stringify(recentTeams)
      );
    }
  }, [recentTeams]);

  const clearLineUp = () => {
    setSwitchMode("custom");

    setCustomTeam([
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
    setTeam([
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
  };
  useEffect(() => {
    console.log(formation);
  }, [formation]);

  return (
    <div className="  h-full overflow-hidden flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 max-w-[1440px] m-auto gap-4 sm:px-4 py-10 bg-black">
      {/* <div className=" absolute bottom-0 bg-red-500">{errorAlert}</div> */}

      <div className=" col-span-1 rounded-xl overflow-hidden">
        <SearchPlayer
          setShowSearch={setShowSearch}
          showSearch={showSearch}
          customTeam={customTeam}
          setCustomTeam={setCustomTeam}
          clickedPlayer={clickedPlayer}
          setErrorAlert={setErrorAlert}
          setTeam={setTeam}
          team={team}
          switchMode={switchMode}
          setSwitchMode={setSwitchMode}
          setPositions={setPositions}
          clickedPlayerData={clickedPlayerData}
          suggestedLineup={suggestedLineup}
          setRecentPlayers={setRecentPlayers}
          recentPlayers={recentPlayers}
        />
        <div
          className={`${
            showSearch ? "block" : "hidden"
          } h-full w-full fixed z-30 top-0 left-0 bg-black bg-opacity-30`}
          onClick={() => {
            setShowSearch(false);
          }}
        ></div>
        <PreFillLineup
          teamId={teamId}
          setTeamId={setTeamId}
          lineupNotFound={lineupNotFound}
          setSwitchMode={setSwitchMode}
          setRecentTeams={setRecentTeams}
          recentTeams={recentTeams}
          getTeams={getTeams}
        />
      </div>
      <div className=" col-span-2 rounded-xl overflow-hidden bg-[#1d1d1d]">
        <div className="  px-4 py-2 flex justify-between items-center">
          <h1 className=" text-[24px] font-semibold text-white text-ellipsis max-w-[70%] overflow-hidden">
            {lineupName ? `${lineupName}'s Lineup` : "LineUp Builder"}
          </h1>
          <Logo />
        </div>
        <div className=" bg-[#2c2c2c] h-[1px] w-full mt-2"></div>
        <div className=" w-full flex justify-between p-4 items-center">
          <select
            name="formation"
            id=""
            value={formation}
            onChange={changeFormation}
            className=" bg-transparent text-[20px] w-fit outline outline-1 rounded-full outline-[#2c2c2c] px-2 text-white focus:bg-[#2C2C2C] cursor-pointer hover:bg-[#2C2C2C] scroll_bar"
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <button className=" text-white cursor-pointer" onClick={clearLineUp}>
            Clear Lineup
          </button>
        </div>
        <div
          className={`bg-[#2C2C2C] m-auto sm:h-[700px] h-[500px] relative col-span-2`}
          ref={componentRef}
        >
          {loadingLineup && (
            <div
              className={` w-full h-full absolute bg-black opacity-20 z-[100]`}
            ></div>
          )}

          <div className="absolute h-[44px] sm:h-[52px] w-28 sm:w-32 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[#343434] bottom-0 left-[50%] translate-x-[-50%] z-20"></div>
          <div className="absolute h-28 sm:h-32 w-60 sm:w-72 rounded-tl-lg rounded-tr-lg border-4 border-b-0 border-solid border-[#343434] bottom-0 left-[50%] translate-x-[-50%] bg-[#2C2C2C] z-10"></div>
          <div className="absolute h-[128px] sm:h-[150px] w-32 rounded-t-full border-4 border-b-0 border-solid border-[#343434] bottom-0 left-[50%] translate-x-[-50%]"></div>
          {switchMode === "fetched" && team ? (
            <>
              {team?.map((t, index) => (
                <LineUp
                  style={positions[t.idx]}
                  pos={t.idx}
                  team={team}
                  setTeam={setTeam}
                  positions={positions}
                  setPositions={setPositions}
                  setShowSearch={setShowSearch}
                  showSearch={showSearch}
                  setClickedPlayer={setClickedPlayer}
                  setSwitchMode={setSwitchMode}
                  switchMode={switchMode}
                  setClickedPlayerData={setClickedPlayerData}
                  getTeams={getTeams}
                />
              ))}
            </>
          ) : (
            <>
              {customTeam.map((c, index) => (
                <Player
                  style={positions[c.idx]}
                  pos={c.idx}
                  customTeam={customTeam}
                  setCustomTeam={setCustomTeam}
                  c={c}
                  positions={positions}
                  setPositions={setPositions}
                  setShowSearch={setShowSearch}
                  clickedPlayer={clickedPlayer}
                  setClickedPlayer={setClickedPlayer}
                  setSwitchMode={setSwitchMode}
                  switchMode={switchMode}
                />
              ))}
            </>
          )}
        </div>
        {/* <CustomFormation /> */}
        <div className=" p-4 flex justify-center">
          <input
            type="text"
            className=" outline outline-1 outline-[#2c2c2c] px-3 py-2 rounded-full bg-[#2c2c2c] w-[90%] sm:w-1/2 focus:outline-white text-white text-center"
            placeholder="Enter lineup name"
            value={lineupName}
            onChange={(e) => {
              setLineupName(e.target.value);
              e.target.value.length == 30 && alert("tf you typing man???");
            }}
            maxLength={30}
          />
        </div>
        <div className=" bg-[#2c2c2c] h-[1px] w-full"></div>
        {((customTeam[0].id &&
          customTeam[1].id &&
          customTeam[2].id &&
          customTeam[3].id &&
          customTeam[4].id &&
          customTeam[5].id &&
          customTeam[6].id &&
          customTeam[7].id &&
          customTeam[8].id &&
          customTeam[9].id &&
          customTeam[10].id) ||
          switchMode == "fetched") && (
          // <div className=" p-4 flex justify-center gap-4">
          //   <button
          //     className=" px-3 py-1 bg-[#60df6e] rounded-lg"
          //     onClick={downloadImage}
          //     id="formation-image"
          //   >
          //     Download Image
          //   </button>
          //   <button
          //     className=" px-3 py-1 bg-[#60df6e] rounded-lg"
          //     onClick={copyLink}
          //   >
          //     Copy Link
          //   </button>
          // </div>
          <div>
            <button
              className=" w-full p-4 bg-[#60df6e] text-white"
              onClick={saveLineUp}
            >
              Save Lineup
            </button>
          </div>
        )}
      </div>
      <div className=" col-span-1 px-4 py-4 text-white bg-[#1D1D1D] h-fit rounded-xl hidden lg:block">
        <h3 className=" font-bold text-lg text-center mb-5">Build your XI</h3>
        <p className=" px-2 text-xs mb-4">
          Build your dream XI, pick your team’s next lineup, or plan your
          transfer window.
        </p>
        <p className=" px-2 text-xs">
          Start by clicking on an empty player and searching for the player you
          want to add, or by selecting a team to pre-fill and modify.
        </p>
      </div>
    </div>
  );
}

export default App;
