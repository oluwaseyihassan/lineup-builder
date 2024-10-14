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
    0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
    1: "top-[65%] right-[7%] transition-all duration-500",
    2: "top-[65%] right-[32%] transition-all duration-500",
    3: "top-[65%] left-[32%] transition-all duration-500",
    4: "top-[65%] left-[7%] transition-all duration-500",
    5: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
    6: "top-[38%] left-[15%] transition-all duration-500",
    7: "top-[10%] right-[15%] transition-all duration-500",
    8: "top-[38%] right-[15%] transition-all duration-500",
    9: "top-[10%] left-[15%] transition-all duration-500",
    10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
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

      setSwitchMode("fetched");
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
 

  useEffect(() => {
    switch (formation) {
      case "4-3-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[38%] left-[15%] transition-all duration-500",
          7: "top-[10%] right-[15%] transition-all duration-500",
          8: "top-[38%] right-[15%] transition-all duration-500",
          9: "top-[10%] left-[15%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-4-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[38%] left-[32%] transition-all duration-500",
          6: "top-[38%] left-[7%] transition-all duration-500",
          7: "top-[38%] right-[32%]  transition-all duration-500",
          8: "top-[38%] right-[7%] transition-all duration-500",
          9: "top-[10%] right-[30%] transition-all duration-500",
          10: "top-[10%] left-[30%] transition-all duration-500",
        });
        break;
      case "4-2-3-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[30%] transition-all duration-500",
          6: "top-[44%] left-[30%] transition-all duration-500",
          7: "top-[24%] right-[15%] transition-all duration-500",
          8: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[24%] left-[15%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-1-4-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[24%] left-[32%] transition-all duration-500",
          7: "top-[24%] right-[7%] transition-all duration-500",
          8: "top-[24%] right-[32%] transition-all duration-500",
          9: "top-[24%] left-[7%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-3-2-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[44%] left-[15%] transition-all duration-500",
          7: "top-[24%] left-[27%] transition-all duration-500",
          9: "top-[24%] right-[27%] transition-all duration-500",
          8: "top-[44%] right-[15%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-1-2-1-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[50%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[37%] left-[22%] transition-all duration-500",
          7: "top-[25%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "top-[8%] right-[30%] transition-all duration-500",
          9: "top-[37%] right-[22%] transition-all duration-500",
          10: "top-[8%] left-[30%] transition-all duration-500",
        });
        break;
      case "3-4-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[38%] left-[7%] transition-all duration-500",
          5: "top-[38%] right-[32%] transition-all duration-500",
          6: "top-[38%] left-[32%] transition-all duration-500",
          7: "top-[10%] right-[15%] transition-all duration-500",
          8: "top-[38%] right-[7%] transition-all duration-500",
          9: "top-[10%] left-[15%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "3-5-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[38%] left-[25%] transition-all duration-500",
          5: "top-[38%] right-[25%] transition-all duration-500",
          6: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[10%] right-[27%] transition-all duration-500",
          8: "top-[38%] right-[5%] transition-all duration-500",
          9: "top-[38%] left-[5%] transition-all duration-500",
          10: "top-[10%] left-[27%] transition-all duration-500",
        });
        break;
      case "3-2-4-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[30%] transition-all duration-500",
          5: "top-[44%] right-[30%] transition-all duration-500",
          6: "top-[24%] left-[32%]  transition-all duration-500",
          7: "top-[24%] right-[32%] transition-all duration-500",
          8: "top-[24%] right-[7%] transition-all duration-500",
          9: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
          10: "top-[24%] left-[7%] transition-all duration-500",
        });
        break;
      case "5-3-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[5%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[25%] transition-all duration-500",
          4: "top-[65%] left-[5%] transition-all duration-500",
          5: "top-[65%] right-[25%] transition-all duration-500",
          6: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[10%] right-[27%] transition-all duration-500",
          8: "top-[38%] right-[15%] transition-all duration-500",
          9: "top-[38%] left-[15%] transition-all duration-500",
          10: "top-[10%] left-[27%] transition-all duration-500",
        });
        break;
      case "5-4-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[5%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[25%] transition-all duration-500",
          4: "top-[65%] left-[5%] transition-all duration-500",
          5: "top-[65%] right-[25%] transition-all duration-500",
          6: "top-[38%] left-[32%] transition-all duration-500",
          7: "top-[38%] right-[7%] transition-all duration-500",
          8: "top-[38%] right-[32%] transition-all duration-500",
          9: "top-[38%] left-[7%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-5-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[38%] left-[25%] transition-all duration-500",
          7: "top-[38%] right-[5%] transition-all duration-500",
          8: "top-[38%] right-[25%] transition-all duration-500",
          9: "top-[38%] left-[5%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-4-1-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[32%] transition-all duration-500",
          6: "top-[44%] left-[7%] transition-all duration-500",
          7: "top-[44%] right-[32%]  transition-all duration-500",
          8: "top-[44%] right-[7%] transition-all duration-500",
          9: "top-[24%] right-[50%] translate-x-[50%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-2-2-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[30%] transition-all duration-500",
          6: "top-[44%] left-[30%] transition-all duration-500",
          7: "top-[8%] right-[30%] transition-all duration-500",
          8: "top-[24%] right-[12%] transition-all duration-500",
          9: "top-[24%] left-[12%] transition-all duration-500",
          10: "top-[8%] left-[30%] transition-all duration-500",
        });
        break;
      case "4-2-4":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[38%] right-[30%] transition-all duration-500",
          6: "top-[38%] left-[30%] transition-all duration-500",
          7: "top-[10%] right-[7%] transition-all duration-500",
          8: "top-[10%] left-[7%] transition-all duration-500",
          9: "top-[8%] right-[32%] transition-all duration-500",
          10: "top-[8%] left-[32%] transition-all duration-500",
        });
        break;
      case "3-4-2-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[32%] transition-all duration-500",
          6: "top-[44%] left-[32%] transition-all duration-500",
          7: "top-[44%] right-[7%] transition-all duration-500",
          8: "top-[24%] right-[27%] transition-all duration-500",
          9: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
          10: "top-[24%] left-[27%] transition-all duration-500",
        });
        break;
      case "3-4-1-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[32%] transition-all duration-500",
          6: "top-[44%] left-[32%]  transition-all duration-500",
          7: "top-[44%] right-[7%] transition-all duration-500",
          8: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[8%] right-[27%] transition-all duration-500",
          10: "top-[8%] left-[27%] transition-all duration-500",
        });
        break;
      case "4-3-1-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[15%] transition-all duration-500",
          6: "top-[44%] left-[15%] transition-all duration-500",
          7: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[8%] right-[27%] transition-all duration-500",
          10: "top-[8%] left-[27%] transition-all duration-500",
        });
        break;
      case "5-2-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[5%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[25%] transition-all duration-500",
          4: "top-[65%] left-[5%] transition-all duration-500",
          5: "top-[65%] right-[25%] transition-all duration-500",
          6: "top-[38%] left-[27%] transition-all duration-500",
          7: "top-[38%] right-[27%] transition-all duration-500",
          8: "top-[7%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[10%] right-[15%] transition-all duration-500",
          10: "top-[10%] left-[15%] transition-all duration-500",
        });
        break;
      case "5-2-2-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[5%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[25%] transition-all duration-500",
          4: "top-[65%] left-[5%] transition-all duration-500",
          5: "top-[65%] right-[25%] transition-all duration-500",
          6: "top-[44%] left-[27%] transition-all duration-500",
          8: "top-[44%] right-[27%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[24%] right-[15%] transition-all duration-500",
          9: "top-[24%] left-[15%] transition-all duration-500",
        });
        break;
      case "4-2-1-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[30%] transition-all duration-500",
          6: "top-[44%] left-[30%] transition-all duration-500",
          7: "top-[8%] right-[15%] transition-all duration-500",
          8: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[8%] left-[15%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-1-2-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[24%] left-[27%] transition-all duration-500",
          7: "top-[8%] right-[15%] transition-all duration-500",
          8: "top-[24%] right-[27%] transition-all duration-500",
          9: "top-[8%] left-[15%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "3-1-4-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[24%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[24%] left-[32%]  transition-all duration-500",
          7: "top-[24%] right-[7%] transition-all duration-500",
          8: "top-[24%] right-[32%] transition-all duration-500",
          9: "top-[8%] right-[27%] transition-all duration-500",
          10: "top-[8%] left-[27%] transition-all duration-500",
        });
        break;
      case "4-1-3-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[24%] left-[15%] transition-all duration-500",
          7: "top-[8%] right-[27%] transition-all duration-500",
          8: "top-[24%] right-[15%] transition-all duration-500",
          9: "top-[8%] left-[27%] transition-all duration-500",
          10: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "4-1-2-2-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[7%] transition-all duration-500",
          2: "top-[65%] right-[32%] transition-all duration-500",
          3: "top-[65%] left-[32%] transition-all duration-500",
          4: "top-[65%] left-[7%] transition-all duration-500",
          5: "top-[50%] left-[50%] translate-x-[-50%] transition-all duration-500",
          6: "top-[37%] left-[15%] transition-all duration-500",
          7: "top-[25%] right-[30%] transition-all duration-500",
          8: "top-[25%] left-[30%] transition-all duration-500",
          9: "top-[37%] right-[15%] transition-all duration-500",
          10: "top-[8%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "3-3-4":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[38%] left-[15%] transition-all duration-500",
          5: "top-[38%] right-[15%] transition-all duration-500",
          6: "top-[38%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[10%] right-[15%] transition-all duration-500",
          8: "top-[7%] right-[32%] transition-all duration-500",
          9: "top-[10%] left-[7%] transition-all duration-500",
          10: "top-[7%] left-[32%] transition-all duration-500",
        });
        break;
      case "3-3-3-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[15%] transition-all duration-500",
          5: "top-[44%] right-[15%] transition-all duration-500",
          6: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[24%] right-[15%] transition-all duration-500",
          8: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[24%] left-[15%] transition-all duration-500",
          10: "top-[7%] left-[50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "5-3-1-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[5%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[25%] transition-all duration-500",
          4: "top-[65%] left-[5%] transition-all duration-500",
          5: "top-[65%] right-[25%] transition-all duration-500",
          6: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "top-[44%] right-[15%] transition-all duration-500",
          10: "top-[10%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          9: "top-[44%] left-[15%] transition-all duration-500",
        });
        break;
      case "3-3-2-2":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[7%] transition-all duration-500",
          5: "top-[44%] right-[7%] transition-all duration-500",
          6: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[7%] right-[32%] transition-all duration-500",
          8: "top-[24%] right-[20%] transition-all duration-500",
          9: "top-[24%] left-[20%] transition-all duration-500",
          10: "top-[7%] left-[32%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "3-5-1-1":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[65%] right-[15%] transition-all duration-500",
          2: "top-[65%] left-[50%] translate-x-[-50%] transition-all duration-500",
          3: "top-[65%] left-[15%] transition-all duration-500",
          4: "top-[44%] left-[5%] transition-all duration-500",
          5: "top-[44%] right-[5%] transition-all duration-500",
          6: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[24%] left-[50%] translate-x-[-50%] transition-all duration-500",
          8: "top-[44%] right-[25%] transition-all duration-500",
          9: "top-[44%] left-[25%] transition-all duration-500",
          10: "top-[7%] left-[50%] translate-x-[-50%] translate-x-[-50%] transition-all duration-500",
        });
        break;
      case "2-3-2-3":
        setPositions({
          0: "top-[85%] left-[50%] translate-x-[-50%] transition-all duration-500",
          1: "top-[24%] right-[27%] transition-all duration-500",
          2: "top-[65%] right-[27%] transition-all duration-500",
          3: "top-[65%] left-[27%] transition-all duration-500",
          4: "top-[44%] left-[15%] transition-all duration-500",
          5: "top-[44%] right-[15%] transition-all duration-500",
          6: "top-[44%] left-[50%] translate-x-[-50%] transition-all duration-500",
          7: "top-[7%] right-[15%] transition-all duration-500",
          8: "top-[24%] left-[27%] transition-all duration-500",
          9: "top-[7%] left-[15%] transition-all duration-500",
          10: "top-[7%] left-[50%] translate-x-[-50%] transition-all duration-500",
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
        <Route path="/cf" element={<CustomFormation team={team} />} />
      </Routes>
    </div>
  );
};

export default MainApp;
