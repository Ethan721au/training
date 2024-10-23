"use client";

import React, { useRef, useState } from "react";
import resultSelector from "./resultSelector";
import { defaultPlayers, maxRecentMatches } from "./constants";
import { determineEloScore } from "./lib";
import styles from "./wizanitix.module.css";
// import { updateDB } from "./dbService";

export default function Wizanitix() {
  const [players, setPlayers] = useState(defaultPlayers);
  const intervalID = useRef();
  const gamePlayed = useRef(0);
  const [recentMatches, setRecentMatches] = useState([]);
  console.log(recentMatches, "recentMatches");

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
    const outcome = resultSelector(opponents);
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
      console.log("updatedPlayers", updatedPlayers);

      return updatedPlayers;
    });

    setRecentMatches((prev) => {
      const newEntry = {
        outcome: outcome,
        opponents: opponents,
        // eloExchange: opponents[0].elo - {()=>{return 1}},
      };
      const uppdatedData =
        prev.length < maxRecentMatches
          ? [...prev, newEntry]
          : [...prev.slice(1), newEntry];
      console.log("uppdatedData", uppdatedData);
      return uppdatedData;
    });
  };

  const startSimulation = () => {
    updateElo();
    // intervalID.current = setInterval(() => {
    //   updateElo();
    // }, 100);
    // setTimeout(() => {
    //   clearInterval(intervalID.current);
    // }, 500000);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{player.elo.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {players.map((player) => (
        <div key={player.id}>
          <p>{`Player ${player.name}`}</p>
          <p>{`Wins: ${player.wins}`}</p>
          <p>{`Losses: ${player.losses}`}</p>
          <p>{`Elo: ${player.elo.toFixed(0)}`}</p>
        </div>
      ))} */}

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
      <div>
        {recentMatches.map((match, index) => (
          <>
            <div key={index}>{match.outcome}</div>
            <div>{match.opponents[0].name}</div>
            <div>{match.opponents[1].name}</div>
          </>
        ))}
      </div>
    </>
  );
}
