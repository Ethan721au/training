"use client";

import { useRef, useState } from "react";
import Square from "./Square/Square";

export default function TicTacToe() {
  const row = 3;
  const col = 3;
  const [player, setPlayer] = useState("Circle");
  const square = useRef();
  console.log(square);

  const recordInput = () => {
    console.log(colIndex);
    if (player === "Circle") {
      setPlayer("Cross");
    } else {
      setPlayer("Circle");
    }

    return 5;
  };

  const generateMatrix = (rows: number, cols: number) => {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix.push(Array(cols).fill(5));
    }
    return matrix;
  };

  const matrix = generateMatrix(row, col);

  return (
    <>
      <div>{player}</div>
      {matrix &&
        matrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => (
              <Square
                key={colIndex}
                inputKey={colIndex}
                value={rowIndex + colIndex}
                action={recordInput}
              />
            ))}
          </div>
        ))}
    </>
  );
}
