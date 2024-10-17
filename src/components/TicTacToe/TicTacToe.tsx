"use client";

import { useState } from "react";
import Square from "./Square/Square";
import styles from "./ticTacToe.module.css";

export default function TicTacToe() {
  const defaultMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const [player, setPlayer] = useState("Circle");
  const [matrix, setMatrix] = useState(defaultMatrix);
  // console.log(matrix);

  const recordInput = (
    newInput: number,
    rowIndex: number,
    colIndex: number
  ) => {
    setMatrix((oldMatrix) => {
      const newMatrix = [...oldMatrix];
      newMatrix[rowIndex][colIndex] = newInput;
      determineWinner(newMatrix);
      return newMatrix;
    });

    setPlayer(player === "Circle" ? "Cross" : "Circle");
  };

  const determineWinner = (matrix: number[][]) => {
    console.log(matrix, "matrix");

    //horizontal
    const horizontal = matrix.map((row) => row.reduce((a, b) => a + b, 0));
    console.log(horizontal, "horizontal");
    for (let i = 0; i < horizontal.length; i++) {
      console.log(horizontal[i], "horizontal[i]");
      if (horizontal[i] === 3) {
        console.log("Cross wins");
      }
      if (horizontal[i] === -3) {
        console.log("Circle wins");
      }
    }

    // const sum = numbers.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue;
    // }, 0);

    // const winningCombos = [
    //   // horizontal
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   // vertical
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   // diagonal
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];

    // for (let i = 0; i < winningCombos.length; i++) {
    //   const [a, b, c] = winningCombos[i];
    //   console.log(a);
    //   if (
    //     matrix[a] &&
    //     matrix[a] === matrix[b] &&
    //     matrix[a] === matrix[c] &&
    //     matrix[a] !== 0
    //   ) {
    //     console.log("winner");
    //     return matrix[a];
    //   }
    // }
  };

  return (
    <>
      <div>{player}</div>
      {matrix &&
        matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.container}>
            {row.map((col, colIndex) => (
              <Square
                key={colIndex}
                colIndex={colIndex}
                rowIndex={rowIndex}
                value={matrix[rowIndex][colIndex]}
                action={recordInput}
                player={player}
              />
            ))}
          </div>
        ))}
      <button
        onClick={() => {
          setMatrix(defaultMatrix);
          setPlayer("Circle");
        }}
      >
        reset
      </button>
    </>
  );
}
