import React from "react";
import Square from "./Square/Square";

const generateMatrix = (rows: number, cols: number) => {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(Array(cols).fill(5));
  }
  console.log(matrix);
  return matrix;
};

const generateDisplay = [5, 6, 7];

export default function TicTacToe() {
  const matrix = generateMatrix(3, 3);
  console.log(matrix);

  return (
    <>
      {matrix &&
        matrix.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((col, colIndex) => (
              <Square key={colIndex} value={col} />
            ))}
          </div>
        ))}
    </>
  );
}
