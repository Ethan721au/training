"use client";

import React, { useRef, useState } from "react";
import resultSelector from "./resultSelector";
import { outcomes, defaultPlayers } from "./constants";
import { determineEloScore } from "./lib";

export default function Wizanitix() {
  const [players, setPlayers] = useState(defaultPlayers);
  const intervalID = useRef();
  const gamePlayed = useRef(0);

  const determineOpponents = () => {
    const firstOpponent = players[Math.floor(Math.random() * players.length)];

    const remainingPlayers = players.filter(
      (player) => player.id !== firstOpponent.id
    );
    const secondOpponent =
      remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];
    return [firstOpponent, secondOpponent];
  };

  const updateElo = () => {
    console.log("updateElo");
    gamePlayed.current += 1;
    const opponents = determineOpponents();
    console.log("opponents", opponents);
    const outcome = resultSelector(outcomes);
    console.log("outcome", outcome);

    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers].map((player) =>
        player.id === opponents[0].id
          ? {
              ...player,
              elo:
                outcome === "win"
                  ? player.elo +
                    determineEloScore(player.elo, opponents[1].elo, "win")
                  : player.elo +
                    determineEloScore(player.elo, opponents[1].elo, "loss"),
              wins: outcome === "win" ? player.wins + 1 : player.wins,
              losses: outcome === "loss" ? player.losses + 1 : player.losses,
            }
          : player.id === opponents[1].id
            ? {
                ...player,
                elo:
                  outcome === "win"
                    ? player.elo +
                      determineEloScore(player.elo, opponents[0].elo, "loss")
                    : player.elo +
                      determineEloScore(player.elo, opponents[0].elo, "win"),
                wins: outcome === "loss" ? player.wins + 1 : player.wins,
                losses: outcome === "win" ? player.losses + 1 : player.losses,
              }
            : player
      );
      return updatedPlayers;
    });
  };

  const startSimulation = () => {
    // updateElo();
    intervalID.current = setInterval(() => {
      updateElo();
    }, 100);
    setTimeout(() => {
      clearInterval(intervalID.current);
    }, 500000);
  };

  return (
    <>
      {players.map((player) => (
        <div key={player.id}>
          <p>{`Player ${player.name}`}</p>
          <p>{`Wins: ${player.wins}`}</p>
          <p>{`Losses: ${player.losses}`}</p>
          <p>{`Elo: ${player.elo.toFixed(0)}`}</p>
        </div>
      ))}

      <button
        onClick={() => {
          startSimulation();
        }}
      >
        Start the simulation
      </button>
      <button
        onClick={() => {
          clearInterval(intervalID.current);
        }}
      >
        stop sim
      </button>
      <div>{gamePlayed.current}</div>
    </>
  );
}
