import { useState, useEffect } from "react";
import React from "react";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import DownloadLineup from "./DownloadLineup";
import DownloadImage from "./DownloadImage";
import CustomFormation from "./CustomFormation";

const MainApp = () => {
  const [formation, setFormation] = useState("4-3-3");
  const [team, setTeam] = useState([]);
  const [lineupName, setLineupName] = useState("");
  const [switchMode, setSwitchMode] = useState("custom");
  const [teamId, setTeamId] = useState(null);
  const [suggestedLineup, setSuggestedLineup] = useState({
    players: [],
    teamId: null,
  });
  const [loadingLineup, setLoadingLineup] = useState(false);
  const [lineupNotFound, setLineupNotFound] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [finalFormation, setFinalFormation] = useState([]);
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


  const getTeams = async (teamId) => {
    setLoadingLineup(true);
    try {
      const fetchedTeams = await fetch(
        `https://lineup-builder-server.onrender.com/team?id=${teamId}`
      );
      const data = await fetchedTeams.json();
      setTeam(data.players);

      setSwitchMode('fetched')
      setFormation(data.formation);
      setLineupNotFound(false);
      setSuggestedLineup(data.squad);
      setLoadingLineup(false);
      setFinalFormation(data.players);
    } catch (error) {
      console.log(error);
      setLineupNotFound(true);
      setErrorAlert(error.error);
    }
  };
  // useEffect(() => {

  // }, [teamId]);


  useEffect(() => {
    switch (formation) {
      case "4-3-3":
        setPositions({
          0: "bottom-[4%] left-[50%] translate-x-[-50%] transition-all duration-500",
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
  return (
    <div>
      <Routes>
        <Route path="/team/" element={<DownloadImage />} />
        <Route
          path="/lineup/:id"
          element={
            <DownloadLineup
              team={team}
              setTeam={setTeam}
              customTeam={customTeam}
              setCustomTeam={setCustomTeam}
              formations={formation}
              setFormation={setFormation}
              switchMode={switchMode}
              setSwitchMode={setSwitchMode}
              positions={positions}
              setPositions={setPositions}
              lineupName={lineupName}
              setLineupName={setLineupName}
              finalFormation={finalFormation}
            />
          }
        />
        <Route
          path="/"
          element={
            <App
              team={team}
              setTeam={setTeam}
              customTeam={customTeam}
              setCustomTeam={setCustomTeam}
              formation={formation}
              setFormation={setFormation}
              switchMode={switchMode}
              setSwitchMode={setSwitchMode}
              positions={positions}
              setPositions={setPositions}
              lineupName={lineupName}
              setLineupName={setLineupName}
              teamId={teamId}
              setTeamId={setTeamId}
              suggestedLineup={suggestedLineup}
              setSuggestedLineup={setSuggestedLineup}
              loadingLineup={loadingLineup}
              setLoadingLineup={setLoadingLineup}
              lineupNotFound={lineupNotFound}
              setLineupNotFound={setLineupNotFound}
              errorAlert={errorAlert}
              setErrorAlert={setErrorAlert}
              finalFormation={finalFormation}
              setFinalFormation={setFinalFormation}
              getTeams={getTeams}
            />
          }
        />
        <Route path="/cf" element={<CustomFormation team={team}/>}/>
      </Routes>
    </div>
  );
};

export default MainApp;
