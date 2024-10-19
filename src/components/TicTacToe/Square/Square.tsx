"use client";

import styles from "./square.module.css";

export default function Square({
  value,
  action,
  colIndex,
  rowIndex,
  player,
  winner,
}: {
  value: number;
  action: (newInput: number, rowIndex: number, colIndex: number) => void;
  colIndex: number;
  rowIndex: number;
  player: string;
  winner: string | undefined;
}) {
  const updateInput = () => {
    if (winner) return;
    if (value !== 0) return;
    if (player === "Circle") {
      action(-1, rowIndex, colIndex);
    } else {
      action(1, rowIndex, colIndex);
    }
  };

  const displayValue = value === 1 ? "X" : value === -1 ? "O" : "";

  return (
    <button className={styles.container} onClick={updateInput} key={""}>
      {displayValue}
    </button>
  );
}
