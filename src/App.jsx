import { useEffect, useState } from "react";
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
import { Analytics } from "@vercel/analytics/react"
import { inject } from "@vercel/analytics";

inject()

function App() {
  const [teamId, setTeamId] = useState(null);
  const [team, setTeam] = useState([]);
  const [suggestedLineup, setSuggestedLineup] = useState({
    players: [],
    teamId: null,
  });
  const [showSearch, setShowSearch] = useState(false);
  const [lineupNotFound, setLineupNotFound] = useState(false);
  const [clickedPlayer, setClickedPlayer] = useState(null);
  const [errorAlert, setErrorAlert] = useState("");
  const [switchMode, setSwitchMode] = useState("custom");
  const [loadingLineup, setLoadingLineup] = useState(false);
  const [lineupName, setLineupName] = useState("");
  const [clickedPlayerData, setClickedPlayerData] = useState({});
  const [recentPlayers, setRecentPlayers] = useState([]);
  const [recentTeams, setRecentTeams] = useState([]);
  const [customTeam, setCustomTeam] = useState([
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
  const [formation, setFormation] = useState("4-3-3");
  const [positions, setPositions] = useState({
    0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
    1: "bottom-[25%] right-[10%] transition-all duration-500",
    2: "bottom-[25%] right-[32%] transition-all duration-500",
    3: "bottom-[25%] left-[32%] transition-all duration-500",
    4: "bottom-[25%] left-[10%] transition-all duration-500",
    5: "bottom-[50%] left-[50%] translate-x-[-50%] transition-all duration-500",
    6: "bottom-[50%] left-[20%] transition-all duration-500",
    7: "bottom-[75%] right-[20%] transition-all duration-500",
    8: "bottom-[50%] right-[20%] transition-all duration-500",
    9: "bottom-[75%] left-[20%] transition-all duration-500",
    10: "bottom-[75%] left-[50%] translate-x-[-50%] transition-all duration-500",
  });

  useEffect(() => {
    const getTeams = async () => {
      setLoadingLineup(true);
      try {
        const fetchedTeams = await fetch(
          `https://lineup-builder-server.onrender.com/team?id=${teamId}`
        );
        const data = await fetchedTeams.json();
        setTeam(data.players);
        console.log(data.players);

        setFormation(data.formation);
        setLineupNotFound(false);
        setSuggestedLineup(data.squad);
        setLoadingLineup(false);
      } catch (error) {
        console.log(error);
        setLineupNotFound(true);
        setErrorAlert(error.error);
      }
    };
    getTeams();
  }, [teamId]);

  const changeFormation = (e) => {
    setFormation(e.target.value);
  };

  useEffect(() => {
    switch (formation) {
      case "4-3-3":
        setPositions({
          0: "bottom-[4.5%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "bottom-[25%] right-[10%] transition-all duration-500",
          2: "bottom-[25%] right-[35%] transition-all duration-500",
          3: "bottom-[25%] left-[35%] transition-all duration-500",
          4: "bottom-[25%] left-[10%] transition-all duration-500",
          5: "bottom-[50%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "bottom-[50%] left-[20%] transition-all duration-500",
          7: "bottom-[75%] right-[20%] transition-all duration-500",
          8: "bottom-[50%] right-[20%] transition-all duration-500",
          9: "bottom-[75%] left-[20%] transition-all duration-500",
          10: "bottom-[75%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-4-2":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "bottom-[25%] left-[10%] transition-all duration-500",
          3: "bottom-[25%] left-[35%] transition-all duration-500",
          1: "bottom-[25%] right-[10%] transition-all duration-500",
          2: "bottom-[25%] right-[35%] transition-all duration-500",
          6: "bottom-[50%] left-[10%] transition-all duration-500",
          5: "bottom-[50%] left-[32%] transition-all duration-500",
          8: "bottom-[50%] right-[10%] transition-all duration-500",
          9: "bottom-[75%] right-[30%] transition-all duration-500",
          10: "bottom-[75%] left-[30%] transition-all duration-500",
          7: "bottom-[50%] right-[32%]  transition-all duration-500",
        });
        break;
      case "4-2-3-1":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "sm:top-[66%] top-[62.5%] left-[10%] transition-all duration-500",
          3: "sm:top-[66%] top-[62.5%] left-[35%] transition-all duration-500",
          1: "sm:top-[66%] top-[62.5%] right-[10%] transition-all duration-500",
          2: "sm:top-[66%] top-[62.5%] right-[35%] transition-all duration-500",
          6: "sm:top-[46%] top-[42.5%] left-[30%] transition-all duration-500",
          5: "sm:top-[46%] top-[42.5%] right-[30%] transition-all duration-500",
          8: "sm:top-[26%] top-[22.5%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "sm:top-[26%] top-[22.5%] left-[15%] transition-all duration-500",
          10: "sm:top-[11%] top-[8.5%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "sm:top-[26%] top-[22.5%] right-[15%] transition-all duration-500",
        });
        break;
      case "4-1-4-1":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "bottom-[25%] left-[10%] transition-all duration-500",
          3: "bottom-[25%] left-[35%] transition-all duration-500",
          1: "bottom-[25%] right-[10%] transition-all duration-500",
          2: "bottom-[25%] right-[35%] transition-all duration-500",
          6: "bottom-[62%] left-[32%] transition-all duration-500",
          5: "bottom-[43%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "bottom-[62%] right-[32%] transition-all duration-500",
          9: "bottom-[62%] left-[10%] transition-all duration-500",
          10: "bottom-[80%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "bottom-[62%] right-[10%] transition-all duration-500",
        });
        break;
      case "4-3-2-1":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "bottom-[25%] right-[10%] transition-all duration-500",
          2: "bottom-[25%] right-[35%] transition-all duration-500",
          3: "bottom-[25%] left-[35%] transition-all duration-500",
          4: "bottom-[25%] left-[10%] transition-all duration-500",
          5: "bottom-[45%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "bottom-[45%] left-[20%] transition-all duration-500",
          7: "bottom-[65%] left-[27%] transition-all duration-500",
          8: "bottom-[65%] right-[27%] transition-all duration-500",
          9: "bottom-[45%] right-[20%] transition-all duration-500",
          10: "bottom-[80%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-1-2-1-2":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "bottom-[25%] left-[10%] transition-all duration-500",
          3: "bottom-[25%] left-[35%] transition-all duration-500",
          1: "bottom-[25%] right-[10%] transition-all duration-500",
          2: "bottom-[25%] right-[35%] transition-all duration-500",
          6: "bottom-[52%] left-[22%] transition-all duration-500",
          5: "bottom-[40%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "bottom-[80%] right-[30%] transition-all duration-500",
          9: "bottom-[52%] right-[22%] transition-all duration-500",
          10: "bottom-[80%] left-[30%] transition-all duration-500",
          7: "bottom-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "3-4-3":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "bottom-[50%] left-[10%] transition-all duration-500",
          3: "bottom-[25%] left-[20%] transition-all duration-500",
          1: "bottom-[25%] right-[20%] transition-all duration-500",
          2: "bottom-[25%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "bottom-[50%] left-[32%] transition-all duration-500",
          5: "bottom-[50%] right-[32%] transition-all duration-500",
          8: "bottom-[50%] right-[10%] transition-all duration-500",
          9: "bottom-[75%] left-[20%] transition-all duration-500",
          10: "bottom-[75%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "bottom-[75%] right-[20%] transition-all duration-500",
        });
        break;
      case "3-5-2":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          4: "bottom-[50%] left-[25%] transition-all duration-500",
          3: "bottom-[25%] left-[20%] transition-all duration-500",
          1: "bottom-[25%] right-[20%] transition-all duration-500",
          2: "bottom-[25%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "bottom-[50%] left-[50%] translate-x-[-50%] transition-all duration-500",
          5: "bottom-[50%] right-[25%] transition-all duration-500",
          8: "bottom-[50%] right-[8%] transition-all duration-500",
          9: "bottom-[50%] left-[8%] transition-all duration-500",
          10: "bottom-[75%] left-[25%] transition-all duration-500",
          7: "bottom-[75%] right-[25%] transition-all duration-500",
        });
        break;
      case "3-2-4-1":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "bottom-[25%] right-[20%] transition-all duration-500",
          2: "bottom-[25%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "bottom-[25%] left-[20%] transition-all duration-500",
          4: "bottom-[45%] left-[30%] transition-all duration-500",
          5: "bottom-[45%] right-[30%] transition-all duration-500",
          6: "bottom-[65%] left-[32%]  transition-all duration-500",
          7: "bottom-[65%] right-[32%] transition-all duration-500",
          8: "bottom-[65%] right-[10%] transition-all duration-500",
          9: "bottom-[80%] left-[50%] translate-x-[-50%] transition-all duration-500",
          10: "bottom-[65%] left-[10%] transition-all duration-500",
        });
        break;

      default:
        break;
    }
  }, [formation]);

  const copyLink = () => {};

  const downloadImage = () => {
    // const data = document.getElementById("formation-image").toDataURL("image/png");
    // const a = document.createElement('a')
    // a.href = data;
    // a.download = "lineup.png";
    // a.click();
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

  return (
    <div className="  h-full overflow-hidden flex flex-col-reverse md:grid md:grid-cols-3 lg:grid-cols-4 max-w-[1280px] m-auto gap-4 sm:px-4 my-10">
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
        />
      </div>
      <div className=" col-span-2 rounded-xl overflow-hidden bg-[#1d1d1d]">
        <div className="  px-4 py-2 flex justify-between items-center">
          <h1 className=" text-[24px] font-semibold text-white">
            {lineupName ? lineupName : "LineUp Builder"}
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
            className=" bg-transparent text-[20px] w-fit outline outline-1 rounded-full outline-[#2C2C2C] text-white focus:bg-[#2C2C2C] cursor-pointer hover:bg-[#2C2C2C] scroll_bar"
          >
            <option className="" value="4-3-3">
              4-3-3
            </option>
            <option value="4-4-2">4-4-2</option>
            <option value="4-2-3-1">4-2-3-1</option>
            <option value="4-1-4-1">4-1-4-1</option>
            <option value="4-3-2-1">4-3-2-1</option>
            <option value="4-1-2-1-2">4-1-2-1-2</option>
            <option value="3-4-3">3-4-3</option>
            <option value="3-5-2">3-5-2</option>
            <option value="3-2-4-1">3-2-4-1</option>
            <option value="5-3-2">5-3-2</option>
            <option value="5-4-1">5-4-1</option>
            <option value="4-5-1">4-5-1</option>
            <option value="4-4-1-1">4-4-1-1</option>
            <option value="4-2-2-2">4-2-2-2</option>
            <option value="4-2-4">4-2-4</option>
            <option value="3-4-2-1">3-4-2-1</option>
            <option value="3-4-1-2">3-4-1-2</option>
            <option value="4-3-1-2">4-3-1-2</option>
            <option value="5-2-3">5-2-3</option>
            <option value="5-2-2-1">5-2-2-1</option>
            <option value="4-2-1-3">4-2-1-3</option>
            <option value="4-1-2-3">4-1-2-3</option>
            <option value="3-1-4-2">3-1-4-2</option>
            <option value="4-1-3-2">4-1-3-2</option>
            <option value="4-1-2-2-1">4-1-2-2-1</option>
            <option value="3-3-4">3-3-4</option>
            <option value="3-3-3-1">3-3-3-1</option>
            <option value="5-3-1-1">5-3-1-1</option>
            <option value="3-3-2-2">3-3-2-2</option>
            <option value="3-5-1-1">3-5-1-1</option>
            <option value="2-3-2-3">2-3-2-3</option>
          </select>
          <button className=" text-white cursor-pointer" onClick={clearLineUp}>
            Clear Lineup
          </button>
        </div>
        <div
          className={`bg-[#2C2C2C] m-auto sm:h-[700px] h-[500px] relative col-span-2`}
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
                  positions={positions}
                  setPositions={setPositions}
                  setShowSearch={setShowSearch}
                  showSearch={showSearch}
                  setClickedPlayer={setClickedPlayer}
                  setSwitchMode={setSwitchMode}
                  switchMode={switchMode}
                  setClickedPlayerData={setClickedPlayerData}
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
        <div className=" p-4 flex justify-center">
          <input
            type="text"
            className=" outline outline-1 outline-[#2c2c2c] px-3 py-2 rounded-full bg-[#2c2c2c] w-1/2 focus:outline-white text-white text-center"
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
        {(customTeam[0].id &&
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
          (switchMode == "fetched" && (
            <div className=" p-4 flex justify-center gap-4">
              <button
                className=" px-3 py-1 bg-[#60df6e] rounded-lg"
                onClick={downloadImage}
                id="formation-image"
              >
                Download Image
              </button>
              <button
                className=" px-3 py-1 bg-[#60df6e] rounded-lg"
                onClick={copyLink}
              >
                Copy Link
              </button>
            </div>
          ))}
      </div>
      <div className=" col-span-1 px-4 py-4 text-white bg-[#1d1d1d] h-fit rounded-xl hidden lg:block">
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
