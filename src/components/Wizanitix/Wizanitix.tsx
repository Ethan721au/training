"use client";

import { useState } from "react";
import resultSelector from "./resultSelector";

export default function Wizanitix() {
  const gameOutcomes = ["wins", "lose", "draw"];
  const scores = {
    wins: 3,
    lose: 0,
    draw: 0.5,
  };
  const probabilities = {
    wins: 0.45,
    lose: 0.45,
    draw: 0.5,
  };
  const players = ["A", "B"];
  const [scorePlayerA, setScorePlayerA] = useState(0);
  const [scorePlayerB, setScorePlayerB] = useState(0);

  const [result, setResult] = useState<string | undefined>("let's play!");

  const determineGameResult = () => {
    const result = resultSelector(gameOutcomes, probabilities);

    if (result === "wins") {
      setScorePlayerA((prevScore) => prevScore + scores.wins);
      setResult("Player A wins");
    } else if (result === "lose") {
      setScorePlayerB((prevScore) => prevScore + scores.wins);
      setResult("Player B wins");
    } else {
      setScorePlayerA((prevScore) => prevScore + scores.draw);
      setScorePlayerB((prevScore) => prevScore + scores.draw);
      setResult(`It's a draw`);
    }
  };

  const startSimulation = () => {
    const interval = setInterval(() => {
      determineGameResult();
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  };

  return (
    <>
      <div>{result}</div>
      <div>
        <p>{`Score Player ${players[0]}: ${scorePlayerA}`}</p>
        <p>{`Score Player ${players[1]}: ${scorePlayerB}`}</p>
      </div>
      <button
        onClick={() => {
          startSimulation();
        }}
      >
        Start the simulation
      </button>
    </>
  );
}
