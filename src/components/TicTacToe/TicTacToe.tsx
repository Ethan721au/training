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
  const [winner, setWinner] = useState<string | undefined>(undefined);
  const [matrix, setMatrix] = useState(defaultMatrix);

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
    const checkResult = (result: number) => {
      if (result === 3) {
        setWinner("Cross");
      }
      if (result === -3) {
        setWinner("Circle");
      }
    };

    //horizontal
    const horizontal = matrix.map((row) => row.reduce((a, b) => a + b, 0));
    for (let i = 0; i < horizontal.length; i++) {
      checkResult(horizontal[i]);
    }

    //vertical
    for (let i = 0; i < matrix.length; i++) {
      const vertical = matrix.map((row) => row[i]);
      const sumCol = vertical.reduce((a, b) => a + b, 0);
      checkResult(sumCol);
    }

    //diagonal
    let diagonal1 = 0;
    let diagonal2 = 0;
    const matrixSize = matrix.length;

    for (let i = 0; i < matrixSize; i++) {
      // Directly access diagonal elements
      diagonal1 += matrix[i][i];
      diagonal2 += matrix[i][matrixSize - i - 1];
    }

    // Check the results after the loop
    checkResult(diagonal1);
    checkResult(diagonal2);
  };

  const resetGame = () => {
    setMatrix(defaultMatrix);
    setPlayer("Circle");
    setWinner(undefined);
  };

  return (
    <>
      {winner ? <h1>{winner} wins</h1> : <div>Player turn: {player}</div>}
      {matrix &&
        matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.container}>
            {row.map((_, colIndex) => (
              <Square
                key={colIndex}
                colIndex={colIndex}
                rowIndex={rowIndex}
                value={matrix[rowIndex][colIndex]}
                action={recordInput}
                player={player}
                winner={winner}
              />
            ))}
          </div>
        ))}
      <button onClick={() => resetGame()}>reset</button>
    </>
  );
}
